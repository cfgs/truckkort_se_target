"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { MenuItem } from "../lib/getMenuStructure";

export function Header({ menuItems }: { menuItems: MenuItem[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Helper to render menu recursively
  function renderMenu(items: MenuItem[], parentKey = "") {
    return items.map((item, idx) => {
      const key = `${parentKey}${item.label}-${idx}`;
      if (item.children && item.children.length > 0) {
        const isOpen = openDropdown === key;
        return (
          <li
            key={key}
            className="relative group h-full"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <DropdownMenu open={isOpen}>
              <DropdownMenuTrigger
                onMouseEnter={() => setOpenDropdown(key)}
                asChild
              >
                <Link
                  href={item.href || "#"}
                  className="text-slate-800 focus:outline-none flex items-center h-full text-xl"
                >
                  {item.label}
                  <span className="ml-1">
                    {isOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </span>
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-auto -translate-y-4">
                {item.children.map((child, cidx) => (
                  <DropdownMenuItem key={`${key}-child-${cidx}`}>
                    <Link
                      href={child.href || "#"}
                      className="block w-full p-2 text-gray-800 text-xl"
                    >
                      {child.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        );
      }
      return (
        <li key={key} className="relative group h-full">
          <Link
            href={item.href || "#"}
            className="text-slate-800 focus:outline-none flex items-center h-full text-xl"
          >
            {item.label}
          </Link>
        </li>
      );
    });
  }

  return (
    <nav className="bg-white h-16 ">
      <div className="flex justify-between items-center h-full px-4 border-b border-b-gray-300">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden items-center">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <ul
            className={clsx(
              isMobileMenuOpen ? "md:hidden" : "hidden",
              "absolute w-full bg-slate-400 p-4 mt-3 text-slate-800"
            )}
          >
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link href={item.href || "#"}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Logo */}
        <div className="flex-1 text-center md:text-left">
          <div className="text-slate-800 font-bold text-2xl">
            <Link href="/">truckkort.se</Link>
          </div>
        </div>
        {/* Desktop Menu */}
        <ul
          className={clsx(
            "hidden md:flex md:flex-row space-x-4 md:block h-full flex items-center"
          )}
        >
          {renderMenu(menuItems)}
        </ul>
      </div>
    </nav>
  );
}
