import { getMenuStructure } from "../lib/getMenuStructure";

export default function MenuServer() {
  const menuItems = getMenuStructure();
  // Rendera menystrukturen här, t.ex. som en lista eller skicka som prop till en client component
  return (
    <nav>
      {menuItems.map((item) => (
        <div key={item.label}>{item.label}</div>
      ))}
    </nav>
  );
}
