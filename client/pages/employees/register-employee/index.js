import React from "react";

import styles from "./register.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";
import md5 from "md5";

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
    .required("* Phone Number is required.")
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
      message: "* Invalid Phone Number",
      excludeEmptyString: true,
    }),
  username: yup
    .string()
    .required("* Username is required.")
    .min(2, "* Username is too short"),
  password: yup
    .string()
    .required("* Password is required.")
    .min(6, "* Password is too short - should be minimum 6 characters!"),
  address: yup
    .string()
    .required("* Address is required.")
    .min(2, "* Address is too short"),
  dateOfBirth: yup
    .date()
    .required("* Date Of Birth is required."),
  startDate: yup
    .date()
    .required("* Start Date is required."),
  type: yup
    .string()
    .required("* Type is required.")
    .min(4, "* Type is too short"),
});

export default function RegisterEmployee() {
  const user = null;
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      address: "",
      dateOfBirth: "",
      startDate: "",
      type: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log({ ...values, password: md5(values.password) });
    },
  });
  return (
    <Layout>
      <main className={styles.container}>
        <form key="account-form" onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Employee Details</h4>
              <div className={styles.inputContainer}>
                <span>Name</span>
                <Input
                  name="name"
                  onChange={handleChange}
                  noMargin
                  error={errors.name}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Surname</span>
                <Input
                  name="surname"
                  onChange={handleChange}
                  noMargin
                  error={errors.surname}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Phone Number</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Email</span>
                <Input
                  name="email"
                  onChange={handleChange}
                  noMargin
                  error={errors.email}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Username</span>
                <Input
                  name="username"
                  onChange={handleChange}
                  noMargin
                  error={errors.username}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Password</span>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  noMargin
                  error={errors.password}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Address</span>
                <Input
                  name="address"
                  onChange={handleChange}
                  noMargin
                  error={errors.address}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Date Of Birth</span>
                <input type="date" id="dateOfBirth" name="dateOfBirth" onChange={handleChange} />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Start Date</span>
                <input type="date" id="startDate" name="startDate" onChange={handleChange} />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Type</span>
                <Input
                  name="type"
                  placeholder="Manager | Smart Service | Technician | Storage | Tester | Accountant"
                  onChange={handleChange}
                  noMargin
                  error={errors.type}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
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
              {errors.username && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.username}
                </p>
              )}
              {errors.password && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.password}
                </p>
              )}
              {errors.address && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.address}
                </p>
              )}
              {errors.dateOfBirth && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.dateOfBirth}
                </p>
              )}
              {errors.startDate && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.startDate}
                </p>
              )}
              {errors.type && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.type}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" name="update_button" value="Update">
            Register New Employee
            </Button>

        </form>
      </main>
    </Layout>
  );
}
