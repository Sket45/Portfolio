import React, { FC, useEffect } from "react";
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
  const { setInitialActive, setScrollPosition } = useAppContext();

  const handleClick = () => {
    onExit();
    setTimeout(() => {
      setInitialActive(true);
      setScrollPosition(true);
      router.push("/");
    }, 500);
  };

  return (
    <motion.div className={arrowStyles.arrowBack} onClick={() => handleClick()}>
      <IoMdArrowBack />
    </motion.div>
  );
};

export default ArrowBack;
