import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";

import arrowStyles from "../styles/arrowBack.module.scss";

import { IoMdArrowBack } from "react-icons/io";

import { AnimatePresence, motion } from "framer-motion";
import { transcode } from "buffer";

const ArrowBack = () => {
  const router = useRouter();
  const { setInitialActive, setScrollPosition, setIsExiting, isExiting } =
    useAppContext();
  const [display, setDisplay] = useState("block");

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      setInitialActive(true);
      setScrollPosition(true);
      router.push("/");
    }, 600);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      scrollY > windowHeight ? setDisplay("none") : setDisplay("block");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const arrowVariants = {
    initial: { opacity: 0, x: "-200%" },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        x: { delay: 0.4, duration: 0.4, ease: "easeInOut" },
        opacity: { delay: 0.5, duration: 0.4, ease: "easeInOut" },
      },
    },
    exit: {
      opacity: 0,
      x: "-200%",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className={arrowStyles.arrowBack}
          onClick={() => handleClick()}
          style={{ display: display }}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={arrowVariants}
        >
          <IoMdArrowBack />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArrowBack;
