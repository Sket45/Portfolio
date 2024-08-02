"use client";

import "./globals.css";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { AppProvider } from "./AppContext";

import layoutStyles from "../styles/layout.module.scss";

import ArrowBack from "./arrowBack";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isExiting, setIsExiting] = useState(false);
  const pathname = usePathname();

  const year = new Date().getFullYear();

  const handleExit = () => {
    setIsExiting(true);
  };

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AnimatePresence mode="wait" initial={false}>
            <div key={pathname}>
              <div>
                <div>
                  <ArrowBack onExit={handleExit} />
                </div>
              </div>
              {children}
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
