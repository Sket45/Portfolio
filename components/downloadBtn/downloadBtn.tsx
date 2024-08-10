"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import downloadBtnStyles from "./downloadBtn.module.scss";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface DownloadBtnProps {
  fileName: string;
  size: string;
  href: string;
}

const DownloadBtn: FC<DownloadBtnProps> = ({ fileName, size, href }) => {
  const [showText, setShowText] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");
  const [renderKey, setRenderKey] = useState(0); // State to trigger re-render
  const timeoutRef = useRef<number | null>(null); // Ref to store timeout ID

  // Determine the device type based on window width
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setDeviceType("mobile");
      } else if (width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  // Total animation duration for hover
  const hoverAnimationDuration = 500; // Duration of the icon expansion
  const contentSwitchDelay = 300; // Delay before content switch begins
  const contentAnimationDuration = 200; // Duration of content fade animation

  // Variants for the icon expansion
  const iconVariants = {
    initial: {
      width: "4.5vh",
      borderRadius: "50%",
      opacity: 1,
    },
    hover: {
      width: "100%", // Match the width of the text container for consistency
      borderRadius: "25px",
      border: "1px solid white",
      transition: {
        border: { duration: 0.5, ease: "easeInOut" },
        borderRadius: { duration: 0.5, ease: "easeInOut" },
        width: { duration: 0.5, ease: "easeInOut" },
      },
    },
  };

  // Variants for content fading
  const contentVariants = {
    initial: { opacity: 1 },
    hidden: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    visible: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  useEffect(() => {
    // Manage showText state based on hover state
    if (isHovered) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setShowText(true);
      }, contentSwitchDelay); // Delay to ensure animation is smooth
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowText(false); // Reset immediately when not hovered

      // Trigger re-render after the animation ends
      timeoutRef.current = window.setTimeout(() => {
        setRenderKey((prevKey) => prevKey + 1);
      }, hoverAnimationDuration + contentAnimationDuration); // Total duration to wait before re-render
    }
  }, [isHovered]);

  const handleInteractionStart = () => {
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleInteractionEnd = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (deviceType !== "desktop" && !isHovered) {
      event.preventDefault(); // Prevent the download if not hovered
    }
  };
  return (
    <motion.div
      key={renderKey} // Use renderKey to trigger re-render
      className={downloadBtnStyles.container_download}
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleInteractionEnd}
      onClick={handleInteractionStart} // For mobile and tablet
    >
      <motion.div className={downloadBtnStyles.container_download_title}>
        Download
      </motion.div>
      <motion.p
        className={downloadBtnStyles.container_download_left}
        initial={{ x: 0, opacity: 0 }}
        animate={showText ? { x: "60%", opacity: 1 } : { x: 0, opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.6, -0.28, 0.74, 0.05],
        }}
      >
        {size}
      </motion.p>
      <motion.p
        className={downloadBtnStyles.container_download_right}
        initial={{ x: 0, opacity: 0 }}
        animate={showText ? { x: "-70%", opacity: 1 } : { x: 0, opacity: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.6, -0.28, 0.74, 0.05],
        }}
      >
        {fileName}
      </motion.p>

      <motion.a
        className={downloadBtnStyles.container_download_icon}
        variants={iconVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        href={deviceType === "desktop" || isHovered ? href : undefined}
        download
        target="_blank"
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          {!showText ? (
            <motion.div
              key="icon"
              initial="visible"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
            >
              <IoCloudDownloadOutline />
            </motion.div>
          ) : (
            <motion.div
              key="text"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
            >
              Download
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
};

export default DownloadBtn;
