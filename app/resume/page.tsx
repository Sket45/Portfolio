"use client";

import React, { useEffect } from "react";
import resumeStyles from "../../styles/resume.module.scss";
import DownloadBtn from "@/components/downloadBtn/downloadBtn";
import { AnimatePresence } from "framer-motion";
import { useAppContext } from "../AppContext";
import { motion } from "framer-motion";
import { init } from "next/dist/compiled/webpack/webpack";

const Resume = () => {
  const { isExiting, setIsExiting } = useAppContext();

  const pageTransition = {
    initial: { y: "-100vh" },
    animate: {
      y: "0vh",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const downloadBtnVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    return () => {
      setIsExiting(false);
    };
  }, []);

  return (
    <section className={resumeStyles.container}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={downloadBtnVariants}
            >
              <DownloadBtn
                fileName="Marius-Portfolio.pdf"
                size="Size: 0.24MB"
                href="/images/Marius-Portfolio.pdf"
              />
            </motion.div>
            <motion.div
              className={resumeStyles.container_box}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <div className={resumeStyles.container_box_resume}></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
