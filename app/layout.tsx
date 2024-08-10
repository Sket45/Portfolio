"use client";

import "./globals.css";
import React from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { AppProvider } from "./AppContext";

import layoutStyles from "../styles/layout.module.scss";

import ArrowUp from "@/components/arrowUp";
import LayoutNav from "@/components/layoutNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const year = new Date().getFullYear();

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
              <div
                className={layoutStyles.footer}
                style={{ marginTop: pathname === "/" ? "-8vh" : "0" }}
              >
                <p>{year} | Staugaitis.Marius@gmail.com</p>
              </div>
            </div>
          </AnimatePresence>
        </AppProvider>
      </body>
    </html>
  );
}
