import headerStyles from "../styles/header.module.scss";

import { Typewriter } from "react-simple-typewriter";
import { AnimatePresence, motion, stagger } from "framer-motion";

const Header = () => {
  const displayWords = [
    "Software Developer",
    "IT Specialist",
    "Software Engineer",
  ];

  const credentialVariants = {
    initial: { x: "100vw" },
    animate: {
      x: "0",
      transition: {
        type: "spring",
        staggerChildren: 0.5,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <section className={headerStyles.container} id="header"></section>
      <div className={headerStyles.credentials}>
        <AnimatePresence>
          <motion.div
            className={headerStyles.credentials_wrapper}
            initial="initial"
            animate="animate"
            variants={credentialVariants}
          >
            <motion.div
              className={headerStyles.credentials_wrapper_slogan}
              variants={credentialVariants}
            >
              <p>PORTFOLIO</p>
            </motion.div>
            <motion.div
              className={headerStyles.credentials_wrapper_name}
              variants={credentialVariants}
            >
              Marius<br></br>Staugaitis
            </motion.div>
            <motion.div
              className={headerStyles.credentials_wrapper_title}
              variants={credentialVariants}
            >
              <b>&lt;</b>
              <Typewriter words={displayWords} loop={true} typeSpeed={50} />
              <b>&gt;</b>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Header;
