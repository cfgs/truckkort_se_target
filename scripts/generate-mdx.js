import fs from "fs";
import https from "https";
import path from "path";

const apiKey = process.env.OPENAI_API_KEY;
const prompt = "Skriv en kort artikel om fördelarna med automatisering.";

async function fetchOpenAIContent(prompt) {
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
      "Content-Length": data.length,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
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
    const content = await fetchOpenAIContent(prompt);
    const now = new Date();
    const filename = `${now.toISOString().slice(0, 10)}.mdx`;
    const filePath = path.join(__dirname, "..", "content", filename);

    const mdx = `---
title: "Automatiskt genererad artikel"
date: "${now.toISOString()}"
---

${content}
`;

    fs.writeFileSync(filePath, mdx);
    console.log(`MDX-fil genererad: ${filePath}`);
  } catch (err) {
    console.error("Fel vid generering av MDX:", err);
    process.exit(1);
  }
})();
