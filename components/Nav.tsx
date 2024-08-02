"use client";

import React, { useEffect, useState } from "react";

import navStyles from "../styles/nav.module.scss";
import layoutStyles from "../styles/layout.module.scss";

import AboutSvg from "../public/images/svg/about";
import ContactsSvg from "../public/images/svg/contacts";
import CvSvg from "../public/images/svg/cv";
import ProjectsSvg from "../public/images/svg/projects";

import FallingLeaves from "../components/FallingLeaves";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppContext } from "../app/AppContext";

const Nav = ({ onLoad }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [position, setPosition] = useState(0);
  const year = new Date().getFullYear();

  const router = useRouter();
  const { initialActive, scrollPosition } = useAppContext();

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  const handleClick = (href: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  const pageTransition = {
    initial: {
      y: "-100vh",
      zIndex: 0,
    },
    animate: {
      y: "0",
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        zIndex: 2,
      },
    },
    exit: {
      y: "-100vh",
      zIndex: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={initialActive}>
        {!isExiting && (
          <>
            <motion.div className={navStyles.leaves} exit={{ opacity: 0 }}>
              <FallingLeaves isRightToLeft={false} />
            </motion.div>
            <motion.section
              className={navStyles.container}
              id="nav"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              style={{ zIndex: position }}
              onAnimationComplete={(definition) => {
                if (definition === "animate") {
                  setPosition(2);
                }
              }}
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
          </>
        )}
      </AnimatePresence>
      <div className={layoutStyles.footer}>
        <p>{year} | Staugaitis.Marius@gmail.com</p>
      </div>
    </>
  );
};

export default Nav;
