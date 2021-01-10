import React from "react";

import Header from "../Header";
import SideBar from "../SideBar";

import styles from "./layout.module.scss";

export default function Layout({ title, children }) {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Header title={title} />
        {children}
      </div>
    </div>
  );
}
