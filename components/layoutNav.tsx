import React, { FC, useState } from "react";
import layoutNavBarStyles from "../styles/layoutNavBar.module.scss";
import MenuBtn from "@/app/menuBtn";
import ArrowBack from "@/app/arrowBack";
import { useAppContext } from "@/app/AppContext";

interface LayoutNavProps {
  pathname: string;
}

const LayoutNav: FC<LayoutNavProps> = ({ pathname }) => {
  const [isExiting, setIsExiting] = useState(false);
  const { navActive } = useAppContext();

  const handleExit = () => {
    setIsExiting(true);
  };

  return (
    <div
      className={layoutNavBarStyles.navBar}
      style={{ zIndex: navActive ? 5 : 4 }}
    >
      {pathname === "/" ? <></> : <ArrowBack onExit={handleExit} />}
      <MenuBtn />
    </div>
  );
};

export default LayoutNav;
