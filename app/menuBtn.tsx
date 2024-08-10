import React, { useState, useEffect } from "react";

import menuBtnStyles from "../styles/menuBtn.module.scss";
import menuSelectionStyles from "../styles/menuSelection.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "./AppContext";
import { usePathname } from "next/navigation";

const MenuBtn = () => {
  const [active, setActive] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [color, setColor] = useState("white");
  const { setScrollDisabled, setNavActive, navActive } = useAppContext();
  const [shadow, setShadow] = useState(`0 1px 5px 0 rgba(0, 0, 0, 0.3)`);
  const [display, setDisplay] = useState("block");

  const pathName = usePathname();

  const classNameBtn = `${menuBtnStyles.container} ${
    hasInteracted
      ? active
        ? menuBtnStyles.container_active
        : menuBtnStyles.container_notActive
      : menuBtnStyles.container_initial
  }`;

  const handleClick = () => {
    setActive(!active);
    setHasInteracted(true);
    setScrollDisabled(!active);
    if (!active) setNavActive(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      scrollY > windowHeight ? setColor("black") : setColor("white");

      scrollY > windowHeight - 100 && pathName === "/"
        ? setDisplay("none")
        : setDisplay("block");
    };
    scrollY > window.innerHeight - 100 && pathName === "/"
      ? setDisplay("none")
      : setDisplay("block");

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setNavActive(false);
    };
  }, []);

  const items = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "PROJECTS", href: "/projects" },
    { label: "RESUME", href: "/resume" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <div className={classNameBtn} onClick={() => handleClick()}>
        {[0, 1, 2].map((span) => (
          <span
            key={`span-${span}`}
            style={{ background: color, boxShadow: shadow, display: display }}
          ></span>
        ))}
      </div>

      <AnimatePresence onExitComplete={() => setNavActive(false)}>
        {active && (
          <motion.div
            className={menuSelectionStyles.container}
            initial={{ y: "-100vh" }}
            animate={{ y: "0" }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.5 }}
          >
            <ul className={menuSelectionStyles.container_links}>
              {items.map((item) =>
                pathName === item.href ? (
                  []
                ) : (
                  <li key={item.label}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuBtn;
