"use client";
import React, { useEffect, useState } from "react";

import SmoothScroll from "../components/SmoothScroll";
import Header from "../components/Header";
import Nav from "../components/Nav";

import indexStyles from "../styles/index.module.scss";

import { useAppContext } from "../app/AppContext";

import { usePathname } from "next/navigation";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Home - Portfolio",
//   description: "Marius S. Portfolio Home Page",
// };

const Home: React.FC = () => {
  const { initialActive, scrollPosition } = useAppContext();
  const [isNavLoaded, setIsNavLoaded] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    if (scrollPosition && pathName == "/") {
      window.scrollTo(0, window.innerHeight);
    }
  }, []);

  return (
    <main className={indexStyles.container}>
      <SmoothScroll />
      {initialActive ? (
        isNavLoaded ? (
          <>
            <Header />
            <Nav onLoad={() => {}} />
          </>
        ) : (
          <>
            <div className={indexStyles.container_loading}></div>
            <Nav onLoad={() => setIsNavLoaded(true)} />
          </>
        )
      ) : (
        <>
          <Header />
          <Nav onLoad={() => {}} />
        </>
      )}
    </main>
  );
};

export default Home;
