import React from "react";
import { useRouter } from "next/router";

import { NotificationIcon, SettingsIcon } from "../Icons";

import styles from "./header.module.scss";

import globalHook from "../../hooks/global.hook";

import { titles } from "../../consts/pageTitles";

export default function Header() {
  const router = useRouter();

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();
  return (
    <div className={styles.container}>
      <div className={styles.titleContent}>
        <span className={styles.pageTitle}>
          {titles[router?.pathname] || "Dashboard"}
        </span>
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
