import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";

import arrowStyles from "../styles/arrowBack.module.scss";

import { IoMdArrowBack } from "react-icons/io";

import { motion } from "framer-motion";

interface ArrowBackProps {
  onExit: () => void;
}

const ArrowBack: FC<ArrowBackProps> = ({ onExit }) => {
  const router = useRouter();
  const { setInitialActive, setScrollPosition, setIsExiting } = useAppContext();
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

  return (
    <motion.div
      className={arrowStyles.arrowBack}
      onClick={() => handleClick()}
      style={{ display: display }}
    >
      <IoMdArrowBack />
    </motion.div>
  );
};

export default ArrowBack;
