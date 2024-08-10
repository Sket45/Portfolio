"use client";

import React, { useEffect } from "react";
import resumeStyles from "../../styles/resume.module.scss";
import DownloadBtn from "@/components/downloadBtn/downloadBtn";
import { AnimatePresence } from "framer-motion";
import { useAppContext } from "../AppContext";
import { motion } from "framer-motion";

const Resume = () => {
  const { isExiting, setIsExiting } = useAppContext();

  const pageTransition = {
    initial: { y: "-100vh" },
    animate: { y: "0vh" },
    exit: { y: "-100vh" },
  };

  useEffect(() => {
    return () => {
      setIsExiting(false);
    };
  }, []);

  return (
    <section className={resumeStyles.container}>
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className={resumeStyles.container_box}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            transition={{ duration: 0.5 }}
          >
            <DownloadBtn
              fileName="Marius-Portfolio.pdf"
              size="Size: 0.24MB"
              href="/images/Marius-Portfolio.pdf"
            />

            <div className={resumeStyles.container_box_resume}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
