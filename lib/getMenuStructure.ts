import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
  menuDisplay?: string;
}

function formatTitle(filename: string) {
  return filename.replace(/\.mdx$/, "").replace(/^\w/, (c) => c.toUpperCase());
}

function buildMenuTree(dir: string, baseDir = dir): MenuItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const menu: MenuItem[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const children = buildMenuTree(fullPath, baseDir);
      if (children.length > 0) {
        menu.push({
          label: formatTitle(entry.name),
          children,
        });
      }
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const relPath = path.relative(baseDir, fullPath).replace(/\.mdx$/, "");
      let href = "/" + relPath.replace(/\\/g, "/");
      // Om filen är startsida.mdx, sätt href till "/"
      if (relPath.toLowerCase() === "startsida") {
        href = "/";
      }

      // Läs frontmatter
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContent);

      menu.push({
        label: formatTitle(entry.name),
        href,
        menuDisplay: data.menuDisplay,
      });
    }
  }
  return menu;
}

export function getMenuStructure() {
  const contentDir = path.join(process.cwd(), "content");
  return buildMenuTree(contentDir);
}
