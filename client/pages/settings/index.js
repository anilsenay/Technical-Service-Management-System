import React from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./settings.module.scss";
import { useFormik } from "formik";
import UpdateAccount from "./update-account";
import UpdatePassword from "./update-password";

export default function Settings() {
  return (
    <Layout title="Settings">
      <main className={styles.container}>
        <div className={styles.content}>
          <UpdateAccount />
          <hr />
          <UpdatePassword />
        </div>
      </main>
    </Layout>
  );
}
