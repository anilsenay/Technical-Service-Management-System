import React from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./settings.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("* Name is required.")
    .min(2, "* Name is too short"),
  surname: yup
    .string()
    .required("* Surname is required.")
    .min(2, "* Surname is too short"),
  email: yup.string().email().required("* Email is required."),
  phone: yup
    .string()
    .notRequired()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
      message: "* Invalid Phone Number",
      excludeEmptyString: true,
    }),
});

export default function UpdateAccount() {
  const user = null;
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(errors);
  return (
    <div className={styles.accountContainer}>
      <h4>Account Details</h4>
      <form key="account-form" onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <span>Name</span>
          <Input
            name="name"
            onChange={handleChange}
            defaultValue={user?.name}
            noMargin
            placeholder="Name"
            error={errors.name}
            border
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Surname</span>
          <Input
            name="surname"
            onChange={handleChange}
            defaultValue={user?.surname}
            noMargin
            placeholder="Surname"
            error={errors.surname}
            border
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Email</span>
          <Input
            name="email"
            onChange={handleChange}
            defaultValue={user?.email}
            noMargin
            placeholder="E-mail"
            error={errors.email}
            border
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Phone Number</span>
          <Input
            name="phone"
            onChange={handleChange}
            defaultValue={user?.phoneNumber}
            noMargin
            error={errors.phone}
            border
          />
        </div>

        {errors.name && (
          <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
            {errors.name}
          </p>
        )}
        {errors.surname && (
          <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
            {errors.surname}
          </p>
        )}
        {errors.email && (
          <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
            {errors.email}
          </p>
        )}
        {errors.phone && (
          <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
            {errors.phone}
          </p>
        )}

        <Button type="submit" name="update_button" value="Update">
          Update
        </Button>
      </form>
    </div>
  );
}
