import React from "react";

import styles from "./item.module.scss";
import SidebarIcon from "./sidebar-icon";

export default function SideBarItem({ icon, text, link, isActive }) {
  return (
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
      <SidebarIcon icon={icon} isActive={isActive} />
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
}
