import { getMenuStructure } from "../lib/getMenuStructure";
import { Header } from "./header";

export default function HeaderWrapper() {
  const menuItems = getMenuStructure();
  return <Header menuItems={menuItems} />;
}
