"use client";
import React, { useEffect, useState, RefObject } from "react";

import navStyles from "./navDots.module.scss";

import { motion, stagger } from "framer-motion";

interface NavDotsProps {
  navTitles: string[];
  refs: RefObject<HTMLDivElement>[];
}

const NavDots: React.FC<NavDotsProps> = ({ navTitles, refs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [bounceActiveClass, setBounceActiveClass] = useState<string | []>("");

  const handleClick = (index: number) => {
    if (refs[index] && refs[index].current) {
      refs[index].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHover = (index: number) => {
    if (index != activeIndex) {
      setPrevActive(activeIndex);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (prevActive === null) return;
    if (activeIndex < prevActive) {
      setBounceActiveClass(
        `${navStyles["nav__top_bounce_prevDown"]} ${navStyles["nav__top_bounce_changeDir"]}`
      );
    } else
      setBounceActiveClass(
        `${navStyles["nav__top_bounce_prevUp"]} ${navStyles["nav__top_bounce_changeDir"]}`
      );

    const timer = setTimeout(() => {
      setBounceActiveClass(navStyles["nav__top_bounce_back"]);
    }, 25);

    return () => clearTimeout(timer);
  }, [activeIndex, prevActive]);

  const handleBouncePrev = (index: number) => {
    if (index === prevActive) {
      if (activeIndex > prevActive) {
        return `${navStyles["nav__top_bounce_prevDown"]} ${navStyles["nav__top_bounce_opacity"]}`;
      } else
        return `${navStyles["nav__top_bounce_prevUp"]} ${navStyles["nav__top_bounce_opacity"]}`;
    }
  };
  const handleBounceActive = (index: number) => {
    if (index === activeIndex) {
      return bounceActiveClass;
    }
  };

  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delay: 0.3,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const itemVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.ul
      className={navStyles.nav}
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      <div
        className={navStyles.nav_wrapper}
        onMouseLeave={() => handleHover(0)}
      ></div>
      {navTitles.map((link, index: number) => (
        <motion.li
          key={index}
          onClick={() => handleClick(index)}
          variants={itemVariants}
        >
          <a
            key={index}
            className={activeIndex === index ? navStyles["nav_active"] : ""}
          >
            <div
              className={`${navStyles["nav__top_prev"]} ${handleBouncePrev(
                index
              )}`}
            ></div>

            <div
              className={`${navStyles["nav__top"]} ${handleBounceActive(
                index
              )}`}
            ></div>
          </a>
          <div onMouseEnter={() => handleHover(index)}>
            <h1
              style={
                activeIndex === index
                  ? {
                      color: "rgba(255, 255, 255, 1)",
                    }
                  : {}
              }
            >
              {/* <span
                style={
                  activeIndex === index
                    ? {
                        color: "rgba(114, 71, 83, 1)",
                      }
                    : {}
                }
              >
                #
              </span> */}
              {link}
            </h1>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default NavDots;
