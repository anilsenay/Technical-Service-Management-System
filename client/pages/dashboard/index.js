import React from "react";
import Layout from "../../components/Layout";

import styles from "./dashboard.module.scss";

export default function dashboard() {
  return (
    <Layout>
      <div className={styles.container}></div>
    </Layout>
  );
}
