"use client";

import "./globals.css";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // initial={false}
  return (
    <html lang="en">
      <body>
        <AnimatePresence mode="wait">
          <motion.div key={pathname}>{children}</motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
