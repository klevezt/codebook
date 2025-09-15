"use client";

import React, { useState } from "react";
import { Heart, Layers, Menu, X } from "lucide-react";
import Image from "next/image";
import { SearchInput } from "./molecules/Input";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/_components/ui/navigation-menu";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import FavoriteCounter from "./counters/FavoriteCounter";

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
                      <Heart className="hover:text-white  size-4 " />
                      <FavoriteCounter />
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
            className="sm:hidden p-2 text-primary hover:cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-5 md:size-4" /> : <Menu className="size-5 md:size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden bg-white overflow-hidden transition-all duration-800 ease-in-out
                   ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <NavigationMenu viewport={false} className="flex flex-col space-y-4 p-4">
          <NavigationMenuList className="flex gap-5 flex-wrap shadow-none">
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
                    <Heart className="size-5 md:size-4 hover:text-white" />
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
                    <Layers className="size-5 md:size-4 hover:text-white" />
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <SearchInput />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
