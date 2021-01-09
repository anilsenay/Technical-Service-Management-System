import React from "react";
import SideBar from "../SideBar";

import styles from "./layout.module.scss";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <SideBar />
      {children}
    </div>
  );
}
