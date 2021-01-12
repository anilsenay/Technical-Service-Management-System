import React from "react";

import styles from "./new-payment.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";

import { DownArrowIcon } from "../../../components/Icons";
const DownArrow = () => {
  return (
    <DownArrowIcon
      width={12}
      height={12}
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
  repairmentID: yup
    .number()
    .required("* Repairment ID is required")
    .min(1, "* Repairment ID is too short"),
  totalCost: yup
    .string()
    .required("* Total Cost is required")
    .min(0, "* Total Cost must be bigger than zero"),
  paymentMethod: yup.string().required("* Payment Method is required."),
});

export default function NewPayment() {
  const user = null;
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      repairmentID: "",
      totalCost: "",
      paymentMethod: 1,
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
              <h4>Payment Details</h4>
              <div className={styles.inputContainer}>
                <span>Repairment ID</span>
                <Input
                  name="repairmentID"
                  onChange={handleChange}
                  noMargin
                  error={errors.repairmentID}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Total Cost</span>
                <Input
                  name="totalCost"
                  onChange={handleChange}
                  noMargin
                  error={errors.totalCost}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Payment Method</span>
                <div className={styles.selectContainer}>
                  <select id="paymentMethod" name="paymentMethod" onChange={handleChange}>
                    <option value={1}>Nakit</option>
                    <option value={2}>Kredi Kartı</option>
                    <option value={3}>Mobil Ödeme</option>
                    <option value={4}>Havale</option>
                  </select>
                  <DownArrow />
                </div>
              </div>

              {errors.repairmentID && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.repairmentID}
                </p>
              )}
              {errors.totalCost && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.totalCost}
                </p>
              )}
              {errors.paymentMethod && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.paymentMethod}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" name="update_button" value="Update">
            Create New Payment
            </Button>

        </form>
      </main>
    </Layout>
  );
}
