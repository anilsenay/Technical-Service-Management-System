import React from "react";

import styles from "./register.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

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

export default function RegisterEmployee() {
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
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Surname</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
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
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Email</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
                <div className={styles.seperator}/>
              </div>
              <div className={styles.inputContainer}>
                <span>Username</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Password</span>
                <Input
                  name="phone"
                  type="password"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
                <div className={styles.seperator}/>
              </div>
              <div className={styles.inputContainer}>
                <span>Address</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
                <div className={styles.seperator}/>
              </div>
              <div className={styles.inputContainer}>
                <span>Date Of Birth</span>
                <input type="date" id="birthdate" name="birthdate" />
                <div className={styles.seperator}/>
              </div>
              <div className={styles.inputContainer}>
                <span>Start Date</span>
                <input type="date" id="startdate" name="startdate" />
                <div className={styles.seperator}/>
              </div>
              <div className={styles.inputContainer}>
                <span>Type</span>
                <Input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={user?.phoneNumber}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
                <div className={styles.seperator}/>
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
