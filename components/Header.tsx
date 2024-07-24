import React from "react";

import headerStyles from "../styles/header.module.scss";

import FallingLeaves from "../components/FallingLeaves";

const Header = () => {
  return (
    <section className={headerStyles.container} id="header">
      <div className={headerStyles.container_sky}>
        <div>
          <FallingLeaves isRightToLeft={false} />
        </div>
      </div>
      <div className={headerStyles.container_credentials}>
        <div className={headerStyles.container_credentials_slogan}>
          &lt;PORTFOLIO&gt;
        </div>
        <div className={headerStyles.container_credentials_name}>
          Marius<br></br>Staugaitis
        </div>
        <div className={headerStyles.container_credentials_title}>
          <b>&lt;</b>Software Developer<b>&gt;</b>
        </div>
        <div className={headerStyles.container_buttons}>
          <a href="#nav">Projects</a>
          <div>Get in Touch</div>
        </div>
      </div>
    </section>
  );
};

export default Header;
