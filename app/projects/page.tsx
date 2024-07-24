"use client";
import React, { useState, useRef, useEffect } from "react";

import projectStyles from "../../styles/projects.module.scss";

import { motion } from "framer-motion";
import { itemVariants, contentVariants } from "./variants";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(0);
  const ref = useRef(0);

  const projects = ["2022", "2023", "2024"];

  const pageTransition = {
    initial: { y: "100vh" },
    animate: {
      y: "0vh",
      transition: {
        duration: 0.75,
        ease: "easeInOut",
      },
    },
  };

  const handleClick = (index: null | number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    document.body.style.overflow = "visible";
    document.body.style.height = "100%";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <>
      <section className={projectStyles.container}>
        <motion.div
          className={projectStyles.container_wrapperTop}
          initial="initial"
          animate="animate"
          variants={pageTransition}
        >
          <div className={projectStyles.container_wrapperTop_bg}></div>
          <ul className={projectStyles.container_wrapperTop_listBox}>
            {projects.map((year, index) => (
              <motion.li
                className={projectStyles.container_wrapperTop_listBox_item}
                key={index}
                animate={
                  activeIndex === index ? ["heightChange", "widthChange"] : ""
                }
                variants={itemVariants}
                onClick={() => handleClick(index)}
              >
                <motion.div
                  className={
                    projectStyles.container_wrapperTop_listBox_item_image
                  }
                  animate={activeIndex === index ? "borderChange" : ""}
                  variants={contentVariants}
                >
                  <motion.div
                    className={
                      projectStyles.container_wrapperTop_listBox_item_image__after
                    }
                    animate={activeIndex === index ? "borderChangeAfter" : ""}
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
                    {year}
                  </motion.h1>
                </motion.div>
                <motion.div
                  className={
                    projectStyles.container_wrapperTop_listBox_item_title
                  }
                  animate={
                    activeIndex === index ? ["titleMargin", "titleBorder"] : ""
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
            <div></div>
          </div>
          <div className={projectStyles.container_wrapperBot_right}>
            <div>
              <h1>Overview</h1>
              <p>
                FilePortes is a professional moving service with a clean and
                user-friendly website, designed for quick and easy navigation.
                The site features vibrant and fresh colors, ensuring an inviting
                and modern look.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <section className={projectStyles.belowContainer}>
        <div className={projectStyles.belowContainer_top}>
          <div className={projectStyles.belowContainer_top_left}>
            <div className={projectStyles.belowContainer_top_left_title}>
              <p>01</p>
              <h1>CONCEPT</h1>
            </div>
            <div className={projectStyles.belowContainer_top_left_description}>
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
          </div>
          <div className={projectStyles.belowContainer_bot_left_description}>
            <p>
              The website is built to provide a seamless user experience,
              enabling quick inquiries and contact with movers. It offers
              comprehensive information about moving services and supports
              efficient communication through Amazon WorkMail.
            </p>
          </div>
          <div className={projectStyles.belowContainer_bot_right}>
            <div className={projectStyles.belowContainer_bot_right_img}></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
