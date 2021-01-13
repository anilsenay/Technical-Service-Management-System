import React, { useState } from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./settings.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import globalHook from "../../hooks/global.hook";
import { useRouter } from "next/router";
import md5 from "md5";

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
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const router = useRouter();

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
      const currentPassword = md5(values.currentPassword);
      const newPassword = md5(values.newPassword);
      const confirmPassword = md5(values.confirmPassword);
      fetch('http://localhost:5000/api/employees/updatePassword', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user?.username, oldPassword: currentPassword, newPassword }),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(response);
          if (!response.ok) {
            const error = (data && data.error) || response.status;
            throw new Error(data.error);
          }
          if (response.ok && data) {
            console.log(data)
            typeof window !== 'undefined' && localStorage.setItem('user', JSON.stringify({ ...data.user, password: newPassword }));
            router.push("");
          }
        })
        .catch((e) => {
          console.log(e.toString());
        });
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
            type="password"
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
            type="password"
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
            type="password"
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
        <Button type="submit" name="password_button" value="Update Password">Confirm</Button>
      </form>
    </div>
  );
}
