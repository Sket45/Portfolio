"use client";
import React from "react";

import contactStyles from "../../styles/contact.module.scss";

import { motion } from "framer-motion";

const Contact = () => {
  const pageTransition = {
    initial: { y: "100vh" },
    animate: { y: "0vh" },
  };
  return (
    <section className={contactStyles.container}>
      <motion.div
        className={contactStyles.container_box}
        initial="initial"
        animate="animate"
        variants={pageTransition}
        transition={{ duration: 0.5 }}
      >
        <div className={contactStyles.container_box_leftBg}>
          <div className={contactStyles.container_box_leftBg_image}></div>
        </div>
        <div className={contactStyles.container_box_rightBg}>
          <div className={contactStyles.container_box_rightBg_circle}></div>
          <div className={contactStyles.container_box_rightBg_info}>
            <div className={contactStyles.container_box_rightBg_info_icon}>
              i
            </div>
            <div>
              <h1>FilePortes</h1>
              <h2>Mudanzas</h2>
            </div>
            <div className={contactStyles.triangle}>t</div>
            <p>Ongoing Project</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
