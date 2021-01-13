import React, { useState } from "react";

import styles from "./register.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";
import md5 from "md5";
import globalHook from "../../../hooks/global.hook";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("* Name is required.")
    .min(2, "* Name is too short"),
  lastName: yup
    .string()
    .required("* Surname is required.")
    .min(2, "* Surname is too short"),
  email: yup.string().email().required("* Email is required."),
  phoneNumber: yup
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
  const [postError, setPostError] = useState(false);

  const router = useRouter();

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      username: "",
      password: "",
      address: "",
      dateOfBirth: "",
      startDate: "",
      type: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const sendData = ({ ...values, password: md5(values.password), employeeID: user.ID });

      fetch('http://localhost:5000/api/employees/insert', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
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
            router.push("/success");
          }
        })
        .catch((e) => {
          console.log(e.toString());
          setPostError(true);
        });

    },
  });
  return (
    <Layout title="Register Employee">
      <main className={styles.container}>
        <form key="account-form" onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Employee Details</h4>
              <div className={styles.inputContainer}>
                <span>Name</span>
                <Input
                  name="firstName"
                  onChange={handleChange}
                  noMargin
                  error={errors.firstName}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Surname</span>
                <Input
                  name="lastName"
                  onChange={handleChange}
                  noMargin
                  error={errors.lastName}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Phone Number</span>
                <Input
                  name="phoneNumber"
                  onChange={handleChange}
                  noMargin
                  error={errors.phoneNumber}
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

              {errors.firstName && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.firstName}
                </p>
              )}
              {errors.lastName && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.lastName}
                </p>
              )}
              {errors.email && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.email}
                </p>
              )}
              {errors.phoneNumber && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.phoneNumber}
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
          {postError && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              Some error occurs when creating new repairtment!
            </p>
          )}
          <Button type="submit" name="update_button" value="Update">
            Register New Employee
            </Button>

        </form>
      </main>
    </Layout>
  );
}
