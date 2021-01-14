import React, { useState } from "react";

import styles from "./new-part.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";
import globalHook from "../../../hooks/global.hook";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  partID: yup
    .number()
    .typeError("* Part ID must include only numbers")
    .required("* Part ID is required"),
  partName: yup
    .string()
    .required("* Part Name is required")
    .min(2, "* Part Name is too short"),
  partModel: yup
    .string()
    .required("* Part Model is required")
    .min(1, "* Part Model is too short"),
  partColor: yup.string().nullable(),
  partPrice: yup.number().required("* Part Price is required"),
  quantity: yup.number().required("* Part Quantity is required"),
  boxNumber: yup
    .number()
    .required("* Box Number is required")
    .typeError("* Box Number is required"),
});

export default function AddPart() {
  const [postError, setPostError] = useState(false);

  const router = useRouter();

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      partID: "",
      partName: "",
      partModel: "",
      partColor: null,
      partPrice: 0,
      quantity: 0,
      boxNumber: null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const sendData = { ...values, employeeID: user.ID };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/storage/insertNewPart`, {
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
            console.log(data);
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
    <Layout title="Add New Part">
      <main className={styles.container}>
        <form key="account-form" onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Part Details</h4>
              <div className={styles.inputContainer}>
                <span>Part ID</span>
                <Input
                  name="partID"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part Name</span>
                <Input
                  name="partName"
                  onChange={handleChange}
                  noMargin
                  error={errors.partName}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part Model</span>
                <Input
                  name="partModel"
                  onChange={handleChange}
                  noMargin
                  error={errors.partModel}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part Color</span>
                <Input
                  name="partColor"
                  onChange={handleChange}
                  noMargin
                  error={errors.partColor}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part Price</span>
                <Input
                  name="partPrice"
                  defaultValue={0}
                  onChange={handleChange}
                  noMargin
                  error={errors.partPrice}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Part Quantity</span>
                <Input
                  name="quantity"
                  defaultValue={0}
                  onChange={handleChange}
                  noMargin
                  error={errors.quantity}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
              </div>
              <div className={styles.inputContainer}>
                <span>Box Number</span>
                <Input
                  name="boxNumber"
                  onChange={handleChange}
                  noMargin
                  error={errors.boxNumber}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
              </div>

              {errors.partID && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partID}
                </p>
              )}
              {errors.partName && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partName}
                </p>
              )}
              {errors.partModel && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partModel}
                </p>
              )}
              {errors.partColor && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partColor}
                </p>
              )}
              {errors.partPrice && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partPrice}
                </p>
              )}
              {errors.quantity && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.quantity}
                </p>
              )}
              {errors.boxNumber && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.boxNumber}
                </p>
              )}
            </div>
          </div>
          {postError && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              Some error occurs when creating new repairtment!
            </p>
          )}
          <Button type="submit" name="create-button" value="Create">
            Add New Part
          </Button>
        </form>
      </main>
    </Layout>
  );
}
