"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link
              href="/"
              className="p-4 text-3xl font-bold text-gray-900 hover:text-gray-600"
            >
              Abdullah Balbaid
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/portfolio"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/qualifications"
                  >
                    Qualifications
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/service"
                  >
                    Service
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="https://chat-room-topaz-nu.vercel.app"
                  >
                    Chat
                  </Link>
                </li> */}
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/desktop"
                  >
                    Desktop
                  </Link>
                </li>
                {/* <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/draw"
                  >
                    Draw
                  </Link>
                </li> */}
              </ul>
            </nav>
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Button
                  asChild
                  className="rounded-md bg-gray-900 hover:bg-gray-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                >
                  <a
                    href="https://drive.google.com/file/d/10-ABZ_jpxcaglWg4zhWrK9ktoQ_5xuq1/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                </Button>
              </div>
              <div className="block md:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleMenu}
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div id="menu" className="md:hidden">
          <ul className="space-y-1">
            <li>
              <Link
                href="/portfolio"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={toggleMenu}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/qualifications"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={toggleMenu}
              >
                Qualifications
              </Link>
            </li>
            {/* <li>
              <Link
                href="/service"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={toggleMenu}
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                href="https://chat-room-topaz-nu.vercel.app"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={toggleMenu}
              >
                Chat
              </Link>
            </li> */}
            <li>
              <Link
                href="/desktop"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={toggleMenu}
              >
                Desktop
              </Link>
            </li>
            {/* <li>
              <Link
                href="/draw"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                onClick={toggleMenu}
              >
                Draw
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </header>
  );
}
