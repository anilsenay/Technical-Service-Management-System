import React, { useState } from "react";

import styles from "./new-order.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";
import globalHook from "../../../hooks/global.hook";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  partID_1: yup
    .number()
    .typeError("* Part ID must include only number")
    .required("* You must have at least one part to create an order"),
  partID_1_quantity: yup
    .number()
    .required("* You must order at least 1 piece")
    .min(1, "* You must order at least 1 piece"),
});

export default function NewOrder() {
  const [postError, setPostError] = useState(false);

  const router = useRouter();

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      partID_1: "",
      partID_1_quantity: "",
      partID_2: null,
      partID_2_quantity: null,
      partID_3: null,
      partID_3_quantity: null,
      partID_4: null,
      partID_4_quantity: null,
      partID_5: null,
      partID_5_quantity: null,
      partID_6: null,
      partID_6_quantity: null,
      partID_7: null,
      partID_7_quantity: null,
      partID_8: null,
      partID_8_quantity: null,
      partID_9: null,
      partID_9_quantity: null,
      partID_10: null,
      partID_10_quantity: null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const sendData = { ...values, employeeID: user.ID };

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/insert`, {
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
    <Layout title="New Order">
      <main className={styles.container}>
        <form key="account-form" onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Order Details</h4>
              <div className={styles.inputContainer}>
                <span>Part 1 ID</span>
                <Input
                  name="partID_1"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_1}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_1_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_1_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 2 ID</span>
                <Input
                  name="partID_2"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_2}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_2_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_2_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 3 ID</span>
                <Input
                  name="partID_3"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_3}
                  border
                  smallSize
                />
                <div className={styles.seperator} />
                <span>Part Quantity</span>
                <Input
                  name="partID_3_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_3_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 4 ID</span>
                <Input
                  name="partID_4"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_4}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_4_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_4_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 5 ID</span>
                <Input
                  name="partID_5"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_5}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_5_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_5_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 6 ID</span>
                <Input
                  name="partID_6"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_6}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_6_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_6_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 7 ID</span>
                <Input
                  name="partID_7"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_7}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_7_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_7_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 8 ID</span>
                <Input
                  name="partID_8"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_8}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_8_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_8_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 9 ID</span>
                <Input
                  name="partID_9"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_9}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_9_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_9_quantity}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Part 10 ID</span>
                <Input
                  name="partID_10"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_10}
                  border
                  smallSize
                />
                <div className={styles.seperator} />

                <span>Part Quantity</span>
                <Input
                  name="partID_10_quantity"
                  onChange={handleChange}
                  noMargin
                  error={errors.partID_10_quantity}
                  border
                  smallSize
                />
              </div>
              {errors.partID_1 && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partID_1}
                </p>
              )}
              {errors.partID_1_quantity && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.partID_1_quantity}
                </p>
              )}
            </div>
          </div>
          {postError && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              Some error occurs when creating new repairtment!
            </p>
          )}
          <Button type="submit" name="create_button" value="Create">
            Create New Order
          </Button>
        </form>
      </main>
    </Layout>
  );
}
