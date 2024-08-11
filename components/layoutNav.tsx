import React, { FC, useState } from "react";
import layoutNavBarStyles from "../styles/layoutNavBar.module.scss";
import MenuBtn from "@/app/menuBtn";
import ArrowBack from "@/app/arrowBack";
import { useAppContext } from "@/app/AppContext";

interface LayoutNavProps {
  pathname: string;
}

const LayoutNav: FC<LayoutNavProps> = ({ pathname }) => {
  const { navActive } = useAppContext();

  return (
    <div
      className={layoutNavBarStyles.navBar}
      style={{ zIndex: navActive ? 5 : 4 }}
    >
      {pathname === "/" ? <></> : <ArrowBack />}
      <MenuBtn />
    </div>
  );
};

export default LayoutNav;
