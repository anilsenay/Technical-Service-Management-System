import React, { useEffect } from "react";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";

import * as yup from "yup";
import { useFormik } from "formik";

import { useRouter } from "next/router";

import globalHook from "../../hooks/global.hook";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(2, "Username must be minimum 2 characters!")
    .max(50, "Username must be maximum 50 characters!")
    .required("* Username is required."),
  password: yup
    .string()
    .required("* Password is required.")
    .min(6, "* Password is too short - should be minimum 6 characters!"),
});

export default function LoginForm() {
  const { setLoggedUser, useGlobalState } = globalHook();
  const { user } = useGlobalState();
  const loginError = useGlobalState()?.errors?.user;

  const router = useRouter();

  useEffect(() => {
    if (user) {
      typeof window !== "undefined" && router.push("/dashboard");
    }
  }, [user]);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setLoggedUser(values);
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="username"
        onChange={handleChange}
        placeholder="Username"
        error={errors.username}
      />
      {errors.username && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.username}
        </span>
      )}

      <Input
        name="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
        error={errors.password}
      />
      {errors.password && (
        <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
          {errors.password}
        </span>
      )}

      <Button type="submit">Login</Button>

      {loginError && (
        <span
          style={{
            color: "red",
            marginTop: -10,
            fontSize: 14,
            marginBottom: 20,
            display: "block",
          }}
        >
          {loginError}
        </span>
      )}
      <span style={{ fontWeight: "bold", marginBottom: 12 }}>
        <Link href="/forgot-password">Forgot Password?</Link>
      </span>
    </form>
  );
}
