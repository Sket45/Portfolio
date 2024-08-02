"use client";
import React, { useState, useRef, useEffect } from "react";

import projectStyles from "../../styles/projects.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import { itemVariants, contentVariants } from "./variants";

import ArrowBack from "../arrowBack";
import ArrowUp from "@/components/arrowUp";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(0);
  const [prevIndex, setPrevIndex] = useState<null | number>(0);
  const [isExiting, setIsExiting] = useState(false);

  const projects = [
    { year: "2024", name: "fileportes", id: "fileportes-2024" },
    { year: "2022", name: "gambitBot", id: "gambitBot-2022" },
    { year: "2022", name: "labelTime", id: "labelTime-2022" },
  ];

  const pageTransition = {
    initial: { y: "-100vh" },
    animate: {
      y: "0vh",
      transition: {
        duration: 0.75,
        ease: "easeInOut",
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleClick = (index: null | number) => {
    if (activeIndex !== index) {
      setPrevIndex(activeIndex);
      setActiveIndex(index);
    }
  };

  const handleDirection = () => {
    if (activeIndex === null || prevIndex === null) return;
    return activeIndex < prevIndex ? "right" : "left";
  };

  const handleExit = () => {
    setIsExiting(true);
  };

  useEffect(() => {
    document.body.style.overflow = "visible";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  const contextTransition = {
    initial: {
      opacity: 0,
      transform: "scaleX(0)",
      transformOrigin: `${handleDirection()}`,
    },
    animate: {
      opacity: 1,
      transform: "scaleX(1)",
      transition: {
        duration: 0.25,
      },
    },
    exit: {
      opacity: 0,
      transform: "scaleX(0)",
      transformOrigin: `${handleDirection()}`,
      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <>
      <ArrowUp />

      <section className={projectStyles.container}>
        <AnimatePresence mode="wait">
          {!isExiting && (
            <>
              <motion.div
                className={projectStyles.container_wrapperTop}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
                transition={{ duration: 0.5 }}
              >
                <ul className={projectStyles.container_wrapperTop_listBox}>
                  {projects.map((project, index) => (
                    <motion.li
                      className={
                        projectStyles.container_wrapperTop_listBox_item
                      }
                      key={project.id[index]}
                      animate={
                        activeIndex === index
                          ? ["heightChange", "widthChange"]
                          : ""
                      }
                      variants={itemVariants}
                      onClick={() => handleClick(index)}
                    >
                      <motion.div
                        className={
                          projectStyles.container_wrapperTop_listBox_item_image
                        }
                        id={projectStyles[project.name]}
                        animate={activeIndex === index ? "borderChange" : ""}
                        variants={contentVariants}
                      >
                        <motion.div
                          className={
                            projectStyles.container_wrapperTop_listBox_item_image__after
                          }
                          animate={
                            activeIndex === index ? "borderChangeAfter" : ""
                          }
                          variants={contentVariants}
                        ></motion.div>
                        <motion.div
                          className={
                            projectStyles.container_wrapperTop_listBox_item_image__before
                          }
                          animate={
                            activeIndex === index
                              ? ["borderChangeBefore", "borderChangeBeforeSize"]
                              : ""
                          }
                          variants={contentVariants}
                        ></motion.div>
                        <motion.h2
                          animate={activeIndex === index ? "h2Up" : ""}
                          variants={contentVariants}
                        >{`0${index + 1}`}</motion.h2>
                        <motion.h1
                          animate={activeIndex === index ? "h1Up" : ""}
                          variants={contentVariants}
                        >
                          {project.year}
                        </motion.h1>
                      </motion.div>
                      <motion.div
                        className={
                          projectStyles.container_wrapperTop_listBox_item_title
                        }
                        animate={
                          activeIndex === index
                            ? ["titleMargin", "titleBorder"]
                            : ""
                        }
                        variants={contentVariants}
                      >
                        <motion.div
                          className={
                            projectStyles.container_wrapperTop_listBox_item_title_wrapper
                          }
                          animate={
                            activeIndex === index
                              ? ["titleWrapper", "titleWrapperColor"]
                              : ""
                          }
                          variants={contentVariants}
                        >
                          <motion.div
                            className={projectStyles.border}
                            animate={
                              activeIndex === index
                                ? ["smallBorderWidth", "smallBorderHeight"]
                                : ""
                            }
                            variants={contentVariants}
                          ></motion.div>
                          <motion.h1
                            animate={activeIndex === index ? "h1Margin" : ""}
                            variants={contentVariants}
                          >
                            {index === 0 && "FILEPORTES MUDANZAS"}
                            {index === 1 && '"GAMBIT" DISCORD BOT'}
                            {index === 2 && '"LABEL TIME" MOBILE APP'}
                          </motion.h1>
                          <motion.div
                            className={projectStyles.triangle}
                            animate={
                              activeIndex === index
                                ? ["triangleColor", "triangleMargin"]
                                : ""
                            }
                            variants={contentVariants}
                          ></motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div className={projectStyles.container_wrapperBot}>
                <div className={projectStyles.container_wrapperBot_left}>
                  <div>
                    <h1>Overview</h1>
                    <AnimatePresence mode="wait">
                      {activeIndex !== null && (
                        <motion.div
                          key={activeIndex}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={contextTransition}
                        >
                          {activeIndex === 0 && (
                            <p>
                              <a
                                href="https://www.Fileportes.com"
                                target="_blank"
                              >
                                FilePortes.com
                              </a>
                              &nbsp;is a professional moving company with a
                              clean and user-friendly website, designed for
                              quick and easy navigation. The site features
                              vibrant and fresh colors, ensuring an inviting and
                              modern look.
                            </p>
                          )}
                          {activeIndex === 1 && <p>gambit</p>}
                          {activeIndex === 2 && <p>label time</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className={projectStyles.container_wrapperBot_right}>
                  <div>
                    <h1>Tech & Code</h1>

                    <AnimatePresence mode="wait">
                      {activeIndex !== null && (
                        <motion.ul
                          key={activeIndex}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={contextTransition}
                        >
                          {activeIndex === 0 && (
                            <>
                              <li>
                                <a>GitHub</a>
                              </li>
                              <li>This is a Next.js project</li>
                              <li>Built with JavaScript, Html & Sass</li>
                              <li>Hosted with AWS</li>
                            </>
                          )}
                          {activeIndex === 1 && <p>gambit</p>}
                          {activeIndex === 2 && <p>label time</p>}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      <section className={projectStyles.belowContainer}>
        <div className={projectStyles.belowContainer_top}>
          <div className={projectStyles.belowContainer_top_left}>
            <div className={projectStyles.belowContainer_top_left_title}>
              <p>01</p>
              <h1>CONCEPT</h1>
            </div>
            <div className={projectStyles.belowContainer_top_left_context}>
              <p>
                The website is built to provide a seamless user experience,
                enabling quick inquiries and contact with movers. It offers
                comprehensive information about moving services and supports
                efficient communication through Amazon WorkMail.
              </p>
            </div>
          </div>
          <div className={projectStyles.belowContainer_top_right}>
            <div className={projectStyles.belowContainer_top_right_img}></div>
          </div>
        </div>
        <div className={projectStyles.belowContainer_bot}>
          <div className={projectStyles.belowContainer_bot_left}>
            <div className={projectStyles.belowContainer_bot_left_title}>
              <p>02</p>
              <h1>DEVELOPMENT</h1>
            </div>
            <div className={projectStyles.belowContainer_bot_left_img}></div>
          </div>

          <div className={projectStyles.belowContainer_bot_right}>
            <p>
              Hosted on AWS, the website utilizes Amazon WorkMail for
              communications and includes a WhatsApp option for instant
              messaging. The forms on the site are designed to be quick to fill
              out and clearly indicate the information needed by the company.
              Additionally, the concept includes the use of QR codes on business
              cards for easy access to the website, ensuring that users have
              everything they need on the initial page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
