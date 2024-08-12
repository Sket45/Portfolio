"use client";
import React, { useState, useEffect, use } from "react";

import projectStyles from "../../styles/projects.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import {
  itemExitVariants,
  itemVariants,
  contentVariants,
  pageTransition,
  itemBoxVariants,
  itemBoxVariantsBot,
} from "./variants";

import { useAppContext } from "../AppContext";

import { projectDisplay, projects } from "./projectMeta";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { isExiting, setIsExiting } = useAppContext();
  const [transitionDirection, setTransitionDirection] = useState<
    "next" | "prev"
  >("next");
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([0, 1, 2]);
  const [activeDimensions, setActiveDimensions] = useState({
    width: "45%",
    height: "calc(100% + 4.5vh)",
  });

  const determineVisibleItems = (width: number) => {
    if (width < 700) {
      return [0]; // Show 1 item
    } else if (width < 1000) {
      return [0, 1]; // Show 2 items
    } else {
      return [0, 1, 2]; // Show all items
    }
  };

  useEffect(() => {
    // Set initial windowWidth and visibleItems on mount
    if (typeof window !== "undefined") {
      const initialWidth = window.innerWidth;
      setWindowWidth(initialWidth);
      setVisibleItems(determineVisibleItems(initialWidth));
    }
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const currentWidth = window.innerWidth;
        setWindowWidth(currentWidth);
        setVisibleItems(determineVisibleItems(currentWidth));
      }
    };
    const initialAnimationDuration = 1600;
    const initialLoadTimeout = setTimeout(() => {
      setIsInitialLoad(true);
    }, initialAnimationDuration);

    window.addEventListener("resize", handleResize);
    document.body.style.overflow = "visible";

    return () => {
      document.body.style.overflow = "hidden";
      window.removeEventListener("resize", handleResize);
      setIsExiting(false);
      setIsInitialLoad(false);
      clearTimeout(initialLoadTimeout);
    };
  }, []);

  const handleClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    // Switch to the next set of items
    setTransitionDirection("next");
    setVisibleItems((prevItems) => {
      const increment = (windowWidth ?? 0) < 700 ? 1 : 2; // Adjust increment based on window width
      const newItems = prevItems.map(
        (index) => (index + increment) % projects.length
      );
      if (increment === 1 && newItems[0] === 3) {
        return [0];
      }
      return newItems;
    });
  };

  const handlePrev = () => {
    // Switch to the previous set of items
    setTransitionDirection("prev");
    setVisibleItems((prevItems) => {
      const increment = (windowWidth ?? 0) < 700 ? 1 : 2; // Adjust increment based on window width
      const newItems = prevItems.map((index) => {
        const newIndex = index - increment;
        // Handle wrap-around for negative index
        return newIndex < 0 ? projects.length + newIndex : newIndex;
      });
      if (increment === 1 && newItems[0] === 3) {
        return [2];
      }
      return newItems;
    });
  };

  const transitionVariants = {
    initial: (direction: "next" | "prev" | boolean) => ({
      x: isInitialLoad ? (direction === "next" ? "-100vw" : "100vw") : 0,
      opacity: isInitialLoad ? 1 : 0,
    }),
    animate: {
      x: 0,
      opacity: isInitialLoad ? 1 : 1,
      transition: {
        duration: 0.45,
        ease: "easeInOut",
      },
    },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? "100vw" : "-100vw",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  useEffect(() => {
    switch (visibleItems.length) {
      case 3:
        setActiveDimensions({
          width: "45%",
          height: "calc(100% + 4.5vh)",
        });
        break;
      case 2:
        setActiveDimensions({
          width: "60%",
          height: "calc(100% + 4.5vh)",
        });
        break;
      case 1:
        setActiveDimensions({
          width: "100%",
          height: "calc(100% + 4.5vh)",
        });
        break;
    }

    setActiveIndex(visibleItems[0]);
  }, [visibleItems]);

  const useMediaStyling = (area: string, windowWidth: number) => {
    if (activeIndex === 0) {
      switch (area) {
        case "botLeft":
          return windowWidth < 1000
            ? { position: "absolute" as "absolute" }
            : { width: "50%", position: "relative" as "relative" };
        case "botRight":
          return windowWidth < 1000
            ? { marginTop: "35%" }
            : { width: "50%", marginTop: "3%" };
        default:
          return {};
      }
    }
    return {};
  };

  return (
    <>
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
                {windowWidth && windowWidth < 1000 && (
                  <>
                    <div
                      className={projectStyles.container_wrapperTop_arrowLeft}
                      onClick={handlePrev}
                    >
                      <MdArrowBackIos />
                    </div>
                    <div
                      className={projectStyles.container_wrapperTop_arrowRight}
                      onClick={handleNext}
                    >
                      <MdArrowForwardIos />
                    </div>
                  </>
                )}
                <AnimatePresence>
                  <motion.ul
                    className={projectStyles.container_wrapperTop_listBox}
                    initial="initial"
                    animate="animate"
                    variants={itemBoxVariants}
                  >
                    <AnimatePresence
                      custom={transitionDirection}
                      mode={isInitialLoad ? "wait" : undefined}
                    >
                      {visibleItems.map((index) => (
                        <motion.li
                          initial={isInitialLoad ? "initial" : undefined}
                          animate={isInitialLoad ? "animate" : undefined}
                          exit={isInitialLoad ? "exit" : undefined}
                          variants={transitionVariants}
                          custom={transitionDirection}
                          className={
                            projectStyles.container_wrapperTop_listBox_item
                          }
                          key={`project-${projects[index].id}`}
                          style={{
                            ...(activeIndex === index
                              ? activeDimensions
                              : undefined),
                            cursor: index === 3 ? "default" : "pointer",
                          }}
                          onClick={() =>
                            index === 3 ? [] : handleClick(index)
                          }
                        >
                          <motion.div
                            className={
                              projectStyles.container_wrapperTop_listBox_item_image
                            }
                            id={projectStyles[projects[index].name]}
                            animate={
                              activeIndex === index ? "borderChange" : ""
                            }
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
                                  ? [
                                      "borderChangeBefore",
                                      "borderChangeBeforeSize",
                                    ]
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
                              {projects[index].year}
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
                              style={{
                                cursor: index === 3 ? "default" : "pointer",
                              }}
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
                                animate={
                                  activeIndex === index ? "h1Margin" : ""
                                }
                                variants={contentVariants}
                              >
                                {projects[index].title}
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
                    </AnimatePresence>
                  </motion.ul>
                </AnimatePresence>
              </motion.div>

              <motion.div
                className={projectStyles.container_wrapperBot}
                initial="initial"
                animate="animate"
                variants={itemBoxVariantsBot}
              >
                <motion.div
                  className={projectStyles.container_wrapperBot_left}
                  variants={itemVariants}
                >
                  <motion.div exit="exit" variants={itemExitVariants}>
                    <h1>Overview</h1>
                    <AnimatePresence mode="wait" custom={transitionDirection}>
                      {activeIndex !== null && (
                        <motion.div
                          key={activeIndex}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={transitionVariants}
                          custom={transitionDirection}
                        >
                          {projectDisplay[activeIndex].overview}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
                <motion.div
                  className={projectStyles.container_wrapperBot_right}
                  variants={itemVariants}
                >
                  <motion.div exit="exit" variants={itemExitVariants}>
                    <h1>Tech & Code</h1>

                    <AnimatePresence mode="wait" custom={transitionDirection}>
                      {activeIndex !== null && (
                        <motion.ul
                          key={activeIndex}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={transitionVariants}
                          custom={transitionDirection}
                        >
                          {projectDisplay[activeIndex].tech}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
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
              {projectDisplay[activeIndex].concept}
            </div>
          </div>
          <div className={projectStyles.belowContainer_top_right}>
            <div
              className={projectStyles.belowContainer_top_right_img}
              style={activeIndex === 2 ? { flexDirection: "row" } : {}}
            >
              <div id={projectStyles[`${projects[activeIndex].name}`]}></div>
              <div id={projectStyles[`${projects[activeIndex].name}2`]}></div>
            </div>
          </div>
        </div>
        <div className={projectStyles.belowContainer_bot}>
          <div
            className={projectStyles.belowContainer_bot_left}
            style={useMediaStyling("botLeft", windowWidth ?? 0)}
          >
            <div
              className={projectStyles.belowContainer_bot_left_title}
              style={activeIndex === 0 ? {} : { width: "100%" }}
            >
              <p>02</p>
              <h1>DEVELOPMENT</h1>
            </div>
            <div
              className={projectStyles.belowContainer_bot_left_dev}
              style={activeIndex === 0 ? { display: "none" } : {}}
            >
              {projectDisplay[activeIndex].development}
            </div>
            <div
              className={projectStyles.belowContainer_bot_left_img}
              style={activeIndex === 0 ? {} : { display: "none" }}
            ></div>
          </div>

          <div
            className={projectStyles.belowContainer_bot_right}
            style={useMediaStyling("botRight", windowWidth ?? 0)}
          >
            {projectDisplay[activeIndex].developmentRight}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
