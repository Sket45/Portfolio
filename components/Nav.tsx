"use client";

import React, { useState } from "react";

import navStyles from "../styles/nav.module.scss";

import AboutSvg from "../public/images/svg/about";
import ContactsSvg from "../public/images/svg/contacts";
import CvSvg from "../public/images/svg/cv";
import ProjectsSvg from "../public/images/svg/projects";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  const handleClick = (href: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  const pageTransition = {
    exit: {
      y: "-100vh",
      transition: {
        duration: 0.49,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.section
          className={navStyles.container}
          id="nav"
          exit="exit"
          variants={pageTransition}
        >
          <motion.div className={navStyles.container_wrapper}>
            <ul className={navStyles.container_wrapper_borders}></ul>

            <ul className={navStyles.container_wrapper_bCards}>
              <div>
                <li className={hoverIndex === 0 ? navStyles.hover : ""}>
                  <div></div>
                </li>
                <li className={hoverIndex === 1 ? navStyles.hover : ""}>
                  <div></div>
                </li>
                <li className={hoverIndex === 2 ? navStyles.hover : ""}>
                  <div></div>
                </li>
                <li className={hoverIndex === 3 ? navStyles.hover : ""}>
                  <div></div>
                </li>
              </div>
            </ul>
            <ul className={navStyles.container_wrapper_cards}>
              <li
                onClick={() => handleClick("/about")}
                onMouseEnter={() => setHoverIndex(0)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={navStyles.icon}>
                  <AboutSvg />
                </div>
                <div className={navStyles.image}></div>
                <div className={navStyles.title}>
                  <h1>About</h1>
                  <p>01</p>
                </div>
              </li>
              <li
                onClick={() => handleClick("/projects")}
                onMouseEnter={() => setHoverIndex(1)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={navStyles.icon}>
                  <ProjectsSvg />
                </div>
                <div className={navStyles.image}></div>
                <div className={navStyles.title}>
                  <h1>Projects</h1>
                  <p>02</p>
                </div>
              </li>
              <li
                onClick={() => handleClick("/resume")}
                onMouseEnter={() => setHoverIndex(2)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={navStyles.icon}>
                  <CvSvg />
                </div>
                <div className={navStyles.image}></div>
                <div className={navStyles.title}>
                  <h1>Resume</h1>
                  <p>03</p>
                </div>
              </li>
              <li
                onClick={() => handleClick("/contact")}
                onMouseEnter={() => setHoverIndex(3)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={navStyles.icon}>
                  <ContactsSvg />
                </div>
                <div className={navStyles.image}></div>
                <div className={navStyles.title}>
                  <h1>Contact</h1>
                  <p>04</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Nav;
