import { Card, CardContent, CardHeader } from "@/components/ui/card";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import path from "path";

// Helper to load all .mdx files in this folder
async function getFaqEntries() {
  const faqDir = path.join(process.cwd(), "components", "faq", "content");
  const files = fs.readdirSync(faqDir).filter((f) => f.endsWith(".mdx"));
  const entries = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(faqDir, file);
      const source = fs.readFileSync(filePath, "utf8");
      const { content, data } = matter(source);
      return {
        question: data.question,
        answer: content,
      };
    })
  );
  return entries;
}

export default async function Faq() {
  const faqs = await getFaqEntries();

  return (
    <div className="my-8 ">
      <h2 className="text-3xl font-bold mb-8">Vanliga frågor</h2>
      <div className="flex flex-col gap-6">
        {faqs.map((faq, idx) => (
          <Card key={idx} className="shadow-lg border border-muted ">
            <CardHeader>
              <h3 className="text-lg">{faq.question}</h3>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <MDXRemote source={faq.answer} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
