import React, { useState } from "react";

import styles from "./item.module.scss";

import SidebarIcon from "./sidebar-icon";
import { DownArrowIcon } from "../Icons";

export default function SideBarItem({ icon, text, link, isActive, children }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  console.log(children?.length > 0);
  return (
    <>
      <div
        className={styles.container}
        style={{
          backgroundColor: isActive ? "#E6E9FE" : null,
          borderLeft: isActive ? "4px solid #7F7FFB" : null,
          borderTopLeftRadius: "3px",
          borderBottomLeftRadius: "3px",
          paddingLeft: isActive ? "57px" : "60px",
        }}
      >
        <SidebarIcon icon={icon} isActive={isActive} className={styles.icon} />
        <span
          className={styles.text}
          style={{
            color: isActive ? "#001847" : "#94969C",
            fontWeight: isActive ? "bold" : "normal",
          }}
        >
          {text}
        </span>
        {children && (
          <div
            className={toggleMenu ? styles.arrow_up : styles.arrow_down}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <DownArrowIcon width={14} height={14} fill="#94969C" />
          </div>
        )}
      </div>
      {toggleMenu &&
        (children?.length > 0 ? (
          children.map((item) => {
            return <div className={styles.listElement}>{item}</div>;
          })
        ) : (
          <div className={styles.listElement}>{children}</div>
        ))}
    </>
  );
}

SideBarItem.SubItem = ({ text, isActive }) => {
  return (
    <div className={styles.subItemContainer}>
      <span
        className={styles.text}
        style={{
          color: isActive ? "#001847" : "#94969C",
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        {text}
      </span>
    </div>
  );
};
