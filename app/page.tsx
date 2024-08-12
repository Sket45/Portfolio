"use client";

import React, { useEffect, useState } from "react";
import SmoothScroll from "../components/SmoothScroll";
import Header from "../components/Header";
import Nav from "../components/Nav";
import indexStyles from "../styles/index.module.scss";
import { useAppContext } from "../app/AppContext";
import { usePathname } from "next/navigation";

const Home: React.FC = () => {
  const { initialActive, scrollPosition } = useAppContext();
  const [isNavLoaded, setIsNavLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const updateIsMobile = () => {
      if (window.innerWidth < 1000) {
        console.log("is mobile");
        setIsMobile(true);
        document.body.style.overflow = "visible";
      } else {
        setIsMobile(false);
        document.body.style.overflow = "hidden";
      }
    };

    updateIsMobile(); // Call initially to set state based on initial window size

    window.addEventListener("resize", updateIsMobile);

    return () => {
      document.body.style.overflow = "hidden"; // Restore overflow when unmounting
      window.removeEventListener("resize", updateIsMobile);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  useEffect(() => {
    if (scrollPosition && pathName === "/") {
      window.scrollTo(0, window.innerHeight);
    }
  }, [scrollPosition, pathName]);

  return (
    <main className={indexStyles.container}>
      {!isMobile && <SmoothScroll />}
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
