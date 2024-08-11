"use client";

import React, { FC, useEffect, useState } from "react";

import navStyles from "../styles/nav.module.scss";
import layoutStyles from "../styles/layout.module.scss";

import AboutSvg from "../public/images/svg/about";
import ContactsSvg from "../public/images/svg/contacts";
import CvSvg from "../public/images/svg/cv";
import ProjectsSvg from "../public/images/svg/projects";

import FallingLeaves from "../components/FallingLeaves";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppContext } from "../app/AppContext";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface NavProps {
  onLoad: () => void;
}

const Nav: FC<NavProps> = ({ onLoad }) => {
  const [isExiting, setIsExiting] = useState(false);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [position, setPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [transitionDirection, setTransitionDirection] = useState<
    "next" | "prev"
  >("next");
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  const router = useRouter();
  const { initialActive } = useAppContext();

  const items = [
    { label: "About", icon: <AboutSvg />, href: "/about" },
    { label: "Projects", icon: <ProjectsSvg />, href: "/projects" },
    { label: "Resume", icon: <CvSvg />, href: "/resume" },
    { label: "Contact", icon: <ContactsSvg />, href: "/contact" },
  ];

  // Determine visible items based on the current window width
  const determineVisibleItems = (width: number) => {
    if (width < 640) {
      return [0]; // Show 1 item
    } else if (width < 1000) {
      return [0, 1]; // Show 2 items
    } else {
      return [0, 1, 2, 3]; // Show all 4 items
    }
  };

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
    // Set initial windowWidth and visibleItems on mount
    if (typeof window !== "undefined") {
      const initialWidth = window.innerWidth;
      setWindowWidth(initialWidth);
      setVisibleItems(determineVisibleItems(initialWidth));
    }

    const handleResize = () => {
      if (typeof window !== "undefined") {
        const currentWidth = window.innerWidth;
        setWindowWidth(currentWidth);
        setVisibleItems(determineVisibleItems(currentWidth));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [onLoad]);

  const handleClick = (href: string) => {
    setIsExiting(true);
    setTimeout(() => {
      router.push(href);
    }, 600);
  };

  const handleNext = () => {
    // Switch to the next pair of items
    setIsInitialLoad(true);
    setTransitionDirection("next");
    setVisibleItems((prevItems) => {
      const increment = (windowWidth ?? 0) < 640 ? 1 : 2; // Adjust increment based on window width
      const newItems = prevItems.map(
        (index) => (index + increment) % items.length
      );

      return newItems;
    });
  };

  const handlePrev = () => {
    // Switch to the previous pair of items
    setIsInitialLoad(true);
    setTransitionDirection("prev");
    setVisibleItems((prevItems) => {
      const increment = (windowWidth ?? 0) < 640 ? 1 : 2; // Adjust increment based on window width
      const newItems = prevItems.map((index) => {
        const newIndex = index - increment;
        // Handle wrap-around for negative index
        return newIndex < 0 ? items.length + newIndex : newIndex;
      });

      return newItems;
    });
  };

  const pageTransition = {
    initial: {
      y: "-100vh",
      zIndex: 0,
    },
    animate: {
      y: "0",
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        zIndex: 2,
      },
    },
    exit: {
      y: "-100vh",
      zIndex: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Conditional transition variants
  const transitionVariants = {
    initial: (direction: "next" | "prev") => ({
      x: isInitialLoad ? (direction === "next" ? "-100vw" : "100vw") : 0,
    }),
    animate: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? "100vw" : "-100vw",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <AnimatePresence initial={initialActive}>
      {!isExiting && (
        <>
          <motion.div className={navStyles.leaves} exit={{ opacity: 0 }}>
            <FallingLeaves isRightToLeft={false} />
          </motion.div>
          <motion.section
            className={navStyles.container}
            id="nav"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            style={{ zIndex: position }}
            onAnimationComplete={(definition) => {
              if (definition === "animate") {
                setPosition(2);
              }
            }}
          >
            <motion.div className={navStyles.container_wrapper}>
              {windowWidth && windowWidth < 1000 && (
                <>
                  <div
                    className={navStyles.container_wrapper_arrowLeft}
                    onClick={handlePrev}
                  >
                    <MdArrowBackIos />
                  </div>
                  <div
                    className={navStyles.container_wrapper_arrowRight}
                    onClick={handleNext}
                  >
                    <MdArrowForwardIos />
                  </div>
                </>
              )}

              <ul className={navStyles.container_wrapper_borders}></ul>

              <ul className={navStyles.container_wrapper_bCards}>
                <div>
                  <AnimatePresence custom={transitionDirection} mode="wait">
                    {visibleItems.map((item) => (
                      <motion.li
                        key={`bCard-${item}`}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={transitionDirection}
                        variants={transitionVariants}
                        className={hoverIndex === item ? navStyles.hover : ""} //?
                      >
                        <div></div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </div>
              </ul>
              <ul className={navStyles.container_wrapper_cards}>
                <AnimatePresence custom={transitionDirection} mode="wait">
                  {visibleItems.map((item) => (
                    <motion.li
                      key={`card-${item}`}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      custom={transitionDirection}
                      variants={transitionVariants}
                      onClick={() => handleClick(items[item].href)}
                      onMouseEnter={() => setHoverIndex(item)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      <div className={navStyles.icon}>{items[item].icon}</div>
                      <div className={navStyles.image}></div>
                      <div className={navStyles.title}>
                        <h1>{items[item].label}</h1>
                        <p>{`0${item + 1}`}</p>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
};

export default Nav;
