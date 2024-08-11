"use client";
import React, { useEffect } from "react";

import contactStyles from "../../styles/contact.module.scss";

import { AnimatePresence, motion } from "framer-motion";

import { TfiEmail } from "react-icons/tfi";
import { useAppContext } from "../AppContext";

const Contact = () => {
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
    <section className={contactStyles.container}>
      <AnimatePresence mode="wait">
        {!isExiting && (
          <>
            <motion.div
              className={contactStyles.container_box}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <div className={contactStyles.container_box_leftBg}>
                <div className={contactStyles.container_box_leftBg_image}></div>
              </div>
              <div className={contactStyles.container_box_rightBg}>
                <div
                  className={contactStyles.container_box_rightBg_circle}
                ></div>
                <div className={contactStyles.container_box_rightBg_info}>
                  <div
                    className={contactStyles.container_box_rightBg_info_icon}
                  >
                    <TfiEmail />
                  </div>
                  <div>
                    <h1>Get In Touch </h1>
                    <h2></h2>
                  </div>
                  <div className={contactStyles.triangle}>t</div>
                  <p>Staugaitis.Marius@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
