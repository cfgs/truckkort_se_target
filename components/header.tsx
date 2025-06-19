"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
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
      const displayName = item.menuDisplay || item.label;

      if (["Om oss", "Truckkort", "Truckkort-skara"].includes(displayName))
        return null;

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
                  {displayName}
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
                      {child.menuDisplay || child.label}
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
            {displayName}
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
            className="bg-white border border-black rounded-md p-2 focus:outline-none"
            style={{
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isMobileMenuOpen ? (
              // X icon (close)
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth="2"
                fill="none"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth="2"
                fill="none"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </Button>
          <ul
            className={clsx(
              isMobileMenuOpen ? "md:hidden" : "hidden",
              "absolute left-0 right-0 w-full m-0 p-0 bg-slate-200 mt-3 text-slate-800"
            )}
          >
            {menuItems.map((item, idx) => {
              const displayName = item.menuDisplay || item.label;
              if (["Om oss", "Truckkort"].includes(displayName)) return null;

              if (item.children && item.children.length > 0) {
                // Parent with children: show label, then children as links
                return (
                  <li key={idx} className="mb-2">
                    <span className="font-semibold block py-2 px-4">
                      {displayName}
                    </span>
                    <ul className="">
                      {item.children.map((child, cidx) => (
                        <li key={cidx}>
                          <Link
                            href={child.href || "#"}
                            className="block py-2 px-6"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.menuDisplay || child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // No children: clickable link
              return (
                <li key={idx}>
                  <Link
                    href={item.href || "#"}
                    className="block pt-4 pb-2 px-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {displayName}
                  </Link>
                </li>
              );
            })}
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
