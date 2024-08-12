"use client";

import "./globals.css";
import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { AppProvider } from "./AppContext";

import layoutStyles from "../styles/layout.module.scss";

import ArrowUp from "@/components/arrowUp";
import LayoutNav from "@/components/layoutNav";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    const setVH = () => {
      // Calculate 1% of the viewport height and set it as a custom property
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();

    window.addEventListener("resize", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AnimatePresence mode="wait" initial={false}>
            <div key={pathname}>
              <LayoutNav pathname={pathname} />
              {children}
              {pathname === "/" ||
              pathname === "/resume" ||
              pathname === "/contact" ? (
                <></>
              ) : (
                <ArrowUp />
              )}
              <Footer pathname={pathname} />
            </div>
          </AnimatePresence>
        </AppProvider>
      </body>
    </html>
  );
}
