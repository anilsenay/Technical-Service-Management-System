import React from "react";

import styles from "./create-repairment.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";

import { DownArrowIcon } from "../../../components/Icons";
const DownArrow = () => {
  return (
    <DownArrowIcon
      width={16}
      height={16}
      fill="grey"
      style={{
        position: "absolute",
        marginTop: "9px",
        right: "10px",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
};

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

export default function CreateRepairment() {
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
              <h4>Repairment Details</h4>
              <div className={styles.inputContainer}>
                <span>Device ID</span>
                <Input
                  name="name"
                  onChange={handleChange}
                  defaultValue={user?.name}
                  noMargin
                  placeholder="Name"
                  error={errors.name}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Model</span>
                <Input
                  name="surname"
                  onChange={handleChange}
                  defaultValue={user?.surname}
                  noMargin
                  placeholder="Surname"
                  error={errors.surname}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Color Code</span>
                <Input
                  name="email"
                  onChange={handleChange}
                  defaultValue={user?.email}
                  noMargin
                  placeholder="E-mail"
                  error={errors.email}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Serial Code</span>
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
                <span>Warranty Due Date</span>
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
                <span>Physical Condition</span>
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
                <span>Proof Of Purchase</span>
                <input type="checkbox" className={styles.checkbox} />
              </div>
              <div className={styles.inputContainer}>
                <span>Is in warranty</span>
                <input type="checkbox" className={styles.checkbox} />
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
            <hr />
            <div className={styles.accountContainer}>
              <h4>Customer Details</h4>
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
                  smallSize
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
                <span>Street Name</span>
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
                <span>Street Number</span>
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
                <span>City</span>
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
                <span>Country</span>
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
                <span>Zipcode</span>
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
          <h4>Case Details</h4>
          <div className={styles.caseContainer}>
            <div className={styles.case}>
              <label>Case Type</label>
              <div className={styles.selectContainer}>
                <select id="type" name="type">
                  <option value="DESC">Desc</option>
                  <option value="ASC">Asc</option>
                </select>
                <DownArrow />
              </div>
            </div>
            <div className={styles.case}>
              <label>Case Category</label>
              <div className={styles.selectContainer}>
                <select id="type" name="type">
                  <option value="DESC">Desc</option>
                  <option value="ASC">Asc</option>
                </select>
                <DownArrow />
              </div>
            </div>
            <div className={styles.case}>
              <label>Case Specification</label>
              <div className={styles.selectContainer}>
                <select id="type" name="type">
                  <option value="DESC">Desc</option>
                  <option value="ASC">Asc</option>
                </select>
                <DownArrow />
              </div>
            </div>
            <div className={styles.case}>
              <label>Case Description</label>
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
          </div>
          <h4>Remark</h4>
          <div className={styles.remark}>
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
          <Button type="submit" name="update_button" value="Update">
            Update
          </Button>
        </form>
      </main>
    </Layout>
  );
}
