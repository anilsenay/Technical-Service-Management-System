import React from "react";
import { NotificationIcon, SettingsIcon } from "../Icons";

import styles from "./header.module.scss";

import globalHook from "../../hooks/global.hook";

export default function Header() {
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();
  return (
    <div className={styles.container}>
      <div className={styles.titleContent}>
        <span className={styles.pageTitle}>Dashboard</span>
      </div>
      <div className={styles.profileContent}>
        <div className={styles.icon}>
          <SettingsIcon
            width={24}
            height={24}
            fill="#94969c"
            stroke="#94969c"
          />
        </div>
        <div className={styles.icon}>
          <NotificationIcon
            width={24}
            height={24}
            fill="#94969c"
            stroke="#94969c"
          />
        </div>
        <span className={styles.userText}>
          Hi, {user ? user.firstName : "Guest"}
        </span>
        <div className={styles.photoContainer}>
          <img
            src="https://www.pngitem.com/pimgs/b/256-2560255_username-icon-png.png"
            alt="Profile photo"
            className={styles.photo}
          />
        </div>
      </div>
    </div>
  );
}
