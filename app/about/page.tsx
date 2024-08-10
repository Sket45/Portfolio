"use client";
import React, { useEffect, useRef, useState } from "react";

import aboutStyles from "../../styles/about.module.scss";

import NavDots from "../../components/navDots/navDots";

import ArrowUp from "../../components/arrowUp";

import Skills from "./skills.json";
import HtmlCssSvg from "../../public/images/svg/html";

import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../AppContext";

const About = () => {
  const [hasPlayedInitialAnimation, setHasPlayedInitialAnimation] =
    useState(false);
  const { isExiting, setIsExiting } = useAppContext();

  const topPageTransition = {
    initial: { y: "-100vh" },
    animate: { y: "0vh" },
    exit: { y: "-100vh", transition: { duration: 0.5, delay: 0.3 } },
  };

  const botPageTransition = {
    initial: { y: "-60vh", opacity: 0 },
    animate: {
      y: "0vh",
      opacity: 1,
      transition: { duration: 0.25, delay: 0.3 },
    },
    exit: {
      y: "-60vh",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const nav = ["Who I Am", "About Me", "Passion", "Skill Set"];

  const skills = Skills;

  const indexRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const midRef = useRef<HTMLDivElement | null>(null);
  const botRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animationPlayed = localStorage.getItem("hasPlayedInitialAnimation");
    if (animationPlayed) {
      setHasPlayedInitialAnimation(true);
    } else {
      localStorage.setItem("hasPlayedInitialAnimation", "true");
    }

    document.body.style.overflow = "visible";
    document.body.style.height = "100%";

    return () => {
      document.body.style.overflow = "hidden";
      setIsExiting(false);
    };
  }, []);

  return (
    <>
      <section className={aboutStyles.container} ref={indexRef}>
        <AnimatePresence mode="wait" initial={!hasPlayedInitialAnimation}>
          {!isExiting && (
            <>
              <motion.div
                className={aboutStyles.container_wrapperTop}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={topPageTransition}
                transition={{ duration: 0.5 }}
              >
                <div className={aboutStyles.container_wrapperTop_bg}></div>
                <div className={aboutStyles.container_wrapperTop_left}>
                  {/* <div className={aboutStyles.triangle}></div>
                  <h1>ABOUT</h1> */}
                </div>
                <div className={aboutStyles.container_wrapperTop_right}></div>
              </motion.div>
              <div className={aboutStyles.container_wrapperBot}>
                <motion.div
                  className={aboutStyles.container_wrapperBot_left}
                  // initial="initial"
                  // animate="animate"
                  // variants={navPageTransition}
                  // transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className={aboutStyles.container_wrapperBot_left_scroll}>
                    SCROLLDOWN
                  </div>
                  <NavDots
                    navTitles={nav}
                    refs={[indexRef, topRef, midRef, botRef]}
                  />
                </motion.div>
                <motion.div
                  className={aboutStyles.container_wrapperBot_right}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={botPageTransition}
                >
                  <h2>MARIUS STAUGAITIS</h2>
                  <h1>
                    I love Design, Technology, and the Lasting Impact it leaves.
                  </h1>
                  <p>
                    With a strong background in hospitality and retail, I've
                    honed my analytical, leadership, and management skills,
                    complemented by exceptional customer service and
                    communication abilities. I bring a diverse skill set to the
                    IT industry, ready to contribute to a professional team's
                    success and eager to leverage my skills and experiences to
                    secure a position that offers professional development and
                    growth opportunities.
                  </p>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </section>

      <section className={aboutStyles.belowContainer}>
        <div className={aboutStyles.belowContainer_top} ref={topRef}>
          <div className={aboutStyles.belowContainer_top_left}>
            <p>01</p>
            <h1>ABOUT ME</h1>
          </div>
          <div className={aboutStyles.belowContainer_top_right}>
            <p>
              I'm a Lithuanian software developer with a go-to positive attitude
              and a lifelong passion for technology. Since childhood, I've been
              fascinated by the inner workings of everyday applications and
              websites, always eager to explore the ever-evolving world of
              technology. My goal has always been to make a meaningful impact,
              even if it's just a small step forward in this vast field.
            </p>

            <div className={aboutStyles.belowContainer_top_right_img}>
              {/* <Image
                src="/images/Marius_S.jpg"
                alt="Marius Staugaitis"
                // width={}
                // height={}
                fill={true}
                objectFit="cover"
                quality={100}
              /> */}
            </div>
          </div>
        </div>
        <div className={aboutStyles.belowContainer_mid} ref={midRef}>
          <div className={aboutStyles.belowContainer_mid_left}>
            <p>02</p>
            <h1>PASSION</h1>
          </div>
          <div className={aboutStyles.belowContainer_mid_right}>
            <div className={aboutStyles.belowContainer_mid_right_design}>
              <div>
                <div></div>
                <h1>DESIGN</h1>
              </div>

              <p>
                Design is more than just aesthetics; it's about creating
                intuitive and engaging user experiences. I've always had a keen
                eye for design, understanding that the visual and interactive
                aspects of an application are crucial for user satisfaction. My
                goal is to blend creativity with functionality, ensuring that
                each project I work on is not only visually appealing but also
                user-friendly and accessible.
              </p>
            </div>
            <div className={aboutStyles.belowContainer_mid_right_tech}>
              <div>
                <div></div>
                <h1>TECHNOLOGY</h1>
              </div>

              <p>
                From a young age, technology has been my playground, always
                eager to learn and explore more. This curiosity drove me to
                pursue a career in software development, where I could turn my
                passion into meaningful contributions. My journey has been
                fueled by a desire to understand and innovate within the
                ever-evolving tech landscape, and I thrive on the challenges
                that come with it.
              </p>
            </div>
            <div className={aboutStyles.belowContainer_mid_right_impact}>
              <div>
                <div></div>
                <h1>LASTING IMPACT</h1>
              </div>

              <p>
                My ultimate goal as a developer is to leave a lasting impact
                through my work. I believe in using technology to make a
                positive difference, particularly in industries like hospitality
                and retail, where small technological advancements can lead to
                significant improvements, making daily operations smoother and
                more enjoyable for workers and customers alike.
              </p>
            </div>
          </div>
        </div>
        <div className={aboutStyles.belowContainer_bot} ref={botRef}>
          <div className={aboutStyles.belowContainer_bot_left}>
            <p>03</p>
            <h1>SKILL SET</h1>
          </div>
          <div className={aboutStyles.belowContainer_bot_right}>
            <ul className={aboutStyles.belowContainer_bot_right_skills}>
              {skills.map((skill, index) => (
                <li
                  key={index}
                  id={skill.name}
                  className={aboutStyles.skill_item}
                >
                  <div
                    className={aboutStyles.skill_item_icon}
                    style={{
                      background: `url(${
                        skill.name === "HTML/CSS" ? "" : skill.icon
                      }) no-repeat center`,
                    }}
                  >
                    {skill.name === "HTML/CSS" ? <HtmlCssSvg /> : null}
                  </div>
                  <div className={aboutStyles.skill_item_container}>
                    <div className={aboutStyles.skill_item_container_meta}>
                      <div
                        className={aboutStyles.skill_item_container_meta_name}
                      >
                        <h1>{skill.name}</h1>
                        <p>
                          {typeof skill.time === "string"
                            ? skill.time
                            : skill.time > 1
                            ? `${skill.time} years`
                            : `${skill.time} year`}
                        </p>
                      </div>

                      <h2>{skill.knowledge}</h2>
                    </div>
                    <div className={aboutStyles.skill_item_container_bar}>
                      <motion.div
                        initial={{ transform: "translateX(0)" }}
                        whileInView={{
                          transform: `translateX(${skill.knowledge - 1}%)`,
                          transition: {
                            duration: 1,
                            ease: "easeInOut",
                          },
                        }}
                      ></motion.div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
