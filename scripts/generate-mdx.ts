// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const https = require("https");

// Enkel YAML-frontmatter-parser
function extractFileNameFromFrontmatter(mdxContent: string): string | null {
  const match = mdxContent.match(/---\s*([\s\S]*?)---/);
  if (!match) return null;
  const frontmatter = match[1];
  const fileNameMatch = frontmatter.match(
    /fileName:\s*["']?([a-z0-9\-\.]+)["']?/i
  );
  return fileNameMatch ? fileNameMatch[1] : null;
}

const apiKey = process.env.OPENAI_API_KEY;
const articlePrompt = `## Viktigt: Följ dessa instruktioner exakt

1. Svaret måste vara i .mdx-format. Se mallen längst ner här, det är endast detta som ska returneras
1. Skriv en artikel på **minst 700 ord**. Detta är **obligatoriskt**.
2. Innehållet ska alltid handla om **truckförarutbildning** i Sverige.
3. Variera varje artikel genom att fokusera på olika infallsvinklar: t.ex. hur utbildningen går till, skillnader mellan A- och B-truckkort, personliga berättelser, regelverk, arbetsmiljö, regionala skillnader, eller tips inför jobbansökan.
4. Artikeln ska kännas unik och välformulerad. Undvik upprepningar från tidigare artiklar.
5. Använd **naturligt språk**, inga punktlistor eller tekniska tabeller.
6. Tonen ska vara vänlig, informativ och skriven som av en kunnig person som förklarar något viktigt.
7. Texten ska vara i **markdown-format** med en tydlig titel som max får vara 5 ord.
8. Skapa en säljande och informativ beskrivning (1–2 meningar).
9. Generera ett "fileName" som bygger på titeln, med små bokstäver, bindestreck istället för mellanslag, och ".mdx" i slutet.

10. Anpassa gärna tonen efter målgruppen (personer som vill bli truckförare), men utan att förenkla för mycket.
11. Texten MÅSTE vara på minst 700 ord.
12. Titlen får vara max 5 ord totalt.

MALLEN:
---
title: {DIN TITEL SOM DU HAR KOMMIT PÅ UTIFRÅN TEXTEN} - truckkort.se
description: {EN KORT BESKRIVNING AV TEXTEN}
fileName: {NAMNET PÅ FILEN, SKA BARA VARA LOWERCASE OCH BINDESTRECK ISTÄLLET FÖR MELLANSLAG OCH AVSLUTAS MED .mdx}
---

# {Samma titel som i "titel" ovan}

{Här ska du skriva innehållet i texten. Det ska vara i markdown-format och skrivet som om det kommer från en människa – alltså med naturligt språk, fullständiga meningar och tydliga övergångar mellan stycken. Undvik punktlistor så långt det går.}`;

function fetchOpenAIContent(prompt: string): Promise<string> {
  const data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  });

  const options = {
    hostname: "api.openai.com",
    path: "/v1/chat/completions",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "Content-Length": Buffer.byteLength(data),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res: any) => {
      let body = "";
      res.on("data", (chunk: any) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode === 200) {
          const json = JSON.parse(body);
          resolve(json.choices[0].message.content);
        } else {
          reject(body);
        }
      });
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  try {
    const content = await fetchOpenAIContent(articlePrompt);
    console.log(content);

    // Extrahera fileName från frontmatter
    const fileName = extractFileNameFromFrontmatter(content);
    if (!fileName) {
      throw new Error("Kunde inte hitta fileName i OpenAI-svaret.");
    }

    const filePath = path.join(__dirname, "..", "content", fileName);

    fs.writeFileSync(filePath, content);
    console.log(`MDX-fil genererad: ${filePath}`);
  } catch (err) {
    console.error("Fel vid generering av MDX:", err);
    process.exit(1);
  }
})();
