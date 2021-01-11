import React, { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./settings.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";

const schema2 = yup.object().shape({
  currentPassword: yup
    .string()
    .required("* Current Password is required.")
    .min(8, "* Password is too short - should be 8 chars minimum."),
  newPassword: yup
    .string()
    .required("* New Password is required.")
    .min(8, "* Password is too short - should be 8 chars minimum."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export default function UpdatePassword() {
  const [passwordError, setError] = useState(null);
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema2,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={styles.passwordContainer}>
      <h4>Change Password</h4>
      <form key="password-form" onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <span>Current Password</span>
          <Input
            name="currentPassword"
            onChange={handleChange}
            placeholder="Current Password"
            noMargin
            border
          />
        </div>
        <div className={styles.inputContainer}>
          <span>New Password</span>
          <Input
            name="newPassword"
            onChange={handleChange}
            placeholder="New Password"
            noMargin
            border
          />
        </div>

        <div className={styles.inputContainer}>
          <span>Confirm New Password</span>
          <Input
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm New Password"
            noMargin
            border
          />
        </div>

        {errors.newPassword && (
          <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
            {errors.newPassword}
          </p>
        )}
        {errors.confirmPassword && (
          <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
            {errors.confirmPassword}
          </p>
        )}
        {passwordError && (
          <p
            style={{
              color: passwordError === "Password Changed!" ? "black" : "red",
              marginTop: 4,
              fontSize: 14,
            }}
          >
            {passwordError}
          </p>
        )}
        <Button type="submit">Confirm</Button>
      </form>
    </div>
  );
}
