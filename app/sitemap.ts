import fs from "fs";
import type { MetadataRoute } from "next";
import path from "path";

// Hjälpfunktion för att hitta alla .mdx-filer i content (inkl. undermappar)
function getAllMdxFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentDir = path.join(process.cwd(), "content");
  const files = getAllMdxFiles(contentDir);

  // Bygg ut URL och lastmod för varje fil
  const pages = files.map((filePath) => {
    // Hämta slug (t.ex. content/om-oss.mdx => /om-oss)
    const relative = path.relative(contentDir, filePath);
    const slug = "/" + relative.replace(/\.mdx$/, "").replace(/\\/g, "/");
    // Hämta senaste ändringsdatum
    const stats = fs.statSync(filePath);
    const lastmod = stats.mtime.toISOString();
    return {
      url: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }${slug}`,
      lastModified: lastmod,
    };
  });

  return pages;
}
