import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import globalHook from "../../hooks/global.hook";

import Header from "../Header";
import SideBar from "../SideBar";

import styles from "./layout.module.scss";

export default function Layout({ title, children }) {
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const router = useRouter();

  if (!user) {
    //typeof window !== "undefined" && router.push("/");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title ? title + " | Technical Service" : "Technical Service"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />
      <div className={styles.content}>
        <Header title={title} />
        {children}
      </div>
    </div>
  );
}
