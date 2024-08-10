export const itemExitVariants = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const itemVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
};

export const itemBoxVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.3,
    },
  },
};

export const itemBoxVariantsBot = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      delayChildren: 1.6,
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

export const contentVariants = {
  borderChange: {
    borderTop: "25px solid transparent",
    borderLeft: "25px solid transparent",
    borderRight: "25px solid transparent",
    borderBottom: "0px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  borderChangeAfter: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  borderChangeBefore: {
    borderTop: "4px solid #724753",
    borderLeft: "4px solid #724753",
    borderRight: "4px solid #724753",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
  borderChangeBeforeSize: {
    top: "-25px",
    left: "-25px",
    right: "-25px",
    bottom: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  h2Up: {
    scale: 1.5,
    y: "-50%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  h1Up: {
    y: "-180%",
    color: "#fff",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  titleMargin: {
    marginTop: "-4.5vh",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  titleBorder: {
    borderLeft: "4px solid #724753",
    borderRight: "4px solid #724753",
    borderBottom: "4px solid #724753",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.3,
    },
  },

  titleWrapper: {
    color: "rgb(0,0,0)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.375,
    },
  },
  smallBorderInitial: {
    height: "0%",
  },
  smallBorderInitialWidth: {
    width: "15%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
  smallBorderWidth: {
    width: "calc(100% - 42px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  smallBorderHeight: {
    height: "calc(100% - 21px)",
    borderTop: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
  triangleColor: {
    backgroundColor: "rgb(0,0,0)",
    rotate: "90deg",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      delay: 0.375,
    },
  },
  triangleMargin: {
    marginBottom: "21px",

    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  h1Margin: {
    marginBottom: "21px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const pageTransition = {
  initial: { y: "-100vh" },
  animate: {
    y: "0vh",
    transition: {
      duration: 0.75,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "-100vh",
    transition: {
      duration: 0.5,
    },
  },
};
