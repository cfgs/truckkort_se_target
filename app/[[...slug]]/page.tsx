import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

import ForkliftCourses from "@/components/ForkliftCourses";
import Image from "next/image";

// 1. Metadata-funktion för Next.js

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  // 👇 This is crucial!
  const { slug } = await params;
  const slugArray = slug ?? ["startsida"];
  const mdxPath = path.join(process.cwd(), "content", ...slugArray) + ".mdx";
  if (!fs.existsSync(mdxPath)) return {};

  const source = fs.readFileSync(mdxPath, "utf8");
  const { data } = matter(source);

  return {
    title: data.title || "truckkort.se",
    description: data.description,
  };
}

// 2. Din page-komponent

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { slug } = await params;
  const slugArray = slug ?? ["startsida"];
  const mdxPath = path.join(process.cwd(), "content", ...slugArray) + ".mdx";

  if (!fs.existsSync(mdxPath)) {
    notFound();
  }

  const source = fs.readFileSync(mdxPath, "utf8");
  const { content } = matter(source);

  const remote = () => {
    if (!slug) return <MDXRemote source={content} components={{ Image }} />;

    if (slug[0] === "truckkort" && slug.length === 1) {
      return (
        <MDXRemote source={content} components={{ Image, ForkliftCourses }} />
      );
    }
  };

  return <div className="prose prose-lg max-w-none">{remote()}</div>;
}
