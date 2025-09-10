"use client";

import React, { useState } from "react";
import { Heart, Layers, Menu, X } from "lucide-react";
import Image from "next/image";
import { SearchInput } from "../molecules/Input";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-b-primary">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative">
            <Link href={"/"}>
              <Image src="/logo.png" alt="logo" width={150} height={64} objectFit="contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu viewport={false} className="hidden sm:flex">
            <NavigationMenuList className="flex gap-5">
              <NavigationMenuItem>
                <SearchInput />
              </NavigationMenuItem>
              <Separator orientation="vertical" className="h-fill" />
              <NavigationMenuItem>
                <NavigationMenuLink className="p-0" asChild>
                  <Link href="/">
                    <Button
                      variant="outline"
                      aria-label="Favorite"
                      className="flex flex-row items-center gap-2 w-full"
                    >
                      <span className="hidden md:inline">Favorites</span>
                      <Heart className="hover:text-white" />
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="p-0" asChild>
                  <Link href="/">
                    <Button
                      variant="outline"
                      aria-label="Favorite"
                      className="flex flex-row items-center gap-2 w-full"
                    >
                      <span className="hidden md:inline">Collections</span>
                      <Layers className="hover:text-white" />
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 p-4">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex gap-5 flex-wrap">
                <Separator orientation="vertical" className="hidden sm:block h-fill" />
                <NavigationMenuItem>
                  <NavigationMenuLink className="p-0" asChild>
                    <Link href="/">
                      <Button
                        variant="outline"
                        aria-label="Favorite"
                        className="flex flex-row items-center gap-2 w-full"
                      >
                        <span className="inline sm:hidden">Favorites</span>
                        <Heart className="hover:text-white" />
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="p-0" asChild>
                    <Link href="/">
                      <Button
                        variant="outline"
                        aria-label="Favorite"
                        className="flex flex-row items-center gap-2 w-full"
                      >
                        <span className="inline sm:hidden ">Collections</span>
                        <Layers className="hover:text-white" />
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <SearchInput />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
