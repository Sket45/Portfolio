import React, { FC } from "react";

import footerStyles from "../styles/footer.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/app/AppContext";

interface FooterProps {
  pathname: string;
}

const Footer: FC<FooterProps> = ({ pathname }) => {
  const year = new Date().getFullYear();
  const { isExiting } = useAppContext();

  const footerVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className={footerStyles.footer}
          style={{ marginTop: pathname === "/" ? "-8vh" : "0" }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={footerVariants}
        >
          <p>{year} | Staugaitis.Marius@gmail.com</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Footer;
