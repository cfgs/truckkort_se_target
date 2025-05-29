import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

import Image from "next/image";

// 1. Metadata-funktion för Next.js

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { slug } = await params;
  const slugArray = slug ?? ["start"];
  const mdxPath = path.join(process.cwd(), "content", ...slugArray) + ".mdx";
  if (!fs.existsSync(mdxPath)) return {};

  const source = fs.readFileSync(mdxPath, "utf8");
  const { data } = matter(source);

  return {
    title: data.title || "truckkort.se",
  };
}

// 2. Din page-komponent

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  // Om ingen slug: visa startsida.mdx
  const { slug } = await params;
  const slugArray = slug ?? ["startsida"];
  const mdxPath = path.join(process.cwd(), "content", ...slugArray) + ".mdx";

  if (!fs.existsSync(mdxPath)) {
    notFound();
  }

  const source = fs.readFileSync(mdxPath, "utf8");
  const { content } = matter(source);

  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={{ Image }} />
    </div>
  );
}
