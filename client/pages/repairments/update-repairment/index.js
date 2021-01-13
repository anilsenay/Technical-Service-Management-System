import React, { useEffect, useState } from "react";

import styles from "./update-repairment.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";

import { DownArrowIcon } from "../../../components/Icons";
import globalHook from "../../../hooks/global.hook";
import { useRouter, withRouter } from "next/router";

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
  partIDNeedChange: yup
    .number()
    .typeError("* Part ID must be include only number").nullable(),
  value: yup.number()
    .typeError("* Part ID must be include only number")
    .min(0, "* Part ID must be 0, 1, 2 or 3")
    .max(3, "* Part ID must be 0, 1, 2 or 3"),
  isPartWaited: yup.boolean(),
  isEnd: yup.boolean(),
  isInWarranty: yup.boolean(),
  remark: yup
    .string()
    .min(3, "* Remark must be min 3 words"),
});

function UpdateRepairment(props) {
  const [postError, setPostError] = useState(false);

  const router = useRouter();

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();
  const { handleSubmit, handleChange, setFieldValue, errors, values } = useFormik({
    initialValues: {
      partIDNeedChange: null,
      value: 0,
      isPartWaited: false,
      isEnd: !!props.router.query.endDate || false,
      isInWarranty: false,
      remark: props.router.query.remark || "Sorun görülmemiştir. Genel bakımlar yapılmıştır.",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const sendData = ({ ...values, employeeID: user.ID || props.router.query.employeeID, repairmentID: props.router.query.repairmentID, repairmentEndDate: values.isEnd && new Date() });

      fetch('http://localhost:5000/api/repairments/update', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      })
        .then(async (response) => {
          const data = await response.json();
          console.log(response);
          if (!response.ok) {
            const error = (data && data.error) || response.status;
            console.log(JSON.stringify(data));
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
  console.log(!!props.router.query.endDate)


  return (
    <Layout title="Update Repairment">
      <main className={styles.container}>
        <form key="account-form" onSubmit={handleSubmit}>
          <div className={styles.content}>
            <div className={styles.accountContainer}>
              <h4>Repairment Details</h4>
              <div className={styles.inputContainer}>
                <span>Part ID To Change</span>
                <Input
                  name="partIDNeedChange"
                  onChange={handleChange}
                  noMargin
                  error={errors.partIDNeedChange}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Repairment Degree</span>
                <Input
                  name="value"
                  onChange={handleChange}
                  noMargin
                  error={errors.value}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Is Part Waited</span>
                <input type="checkbox" className={styles.checkbox} name="isPartWaited" onChange={handleChange} />
              </div>
              <div className={styles.inputContainer}>
                <span>Is In Warranty</span>
                <input type="checkbox" className={styles.checkbox} name="isInWarranty" onChange={handleChange} />
              </div>
              <div className={styles.inputContainer}>
                <span>End Repairment</span>
                <input type="checkbox" className={styles.checkbox} name="isEnd" onChange={handleChange} defaultValue={!!props.router.query.endDate} />
              </div>

              {errors.partIDNeedChange && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.deviceID}
                </p>
              )}
              {errors.value && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.value}
                </p>
              )}
            </div>
          </div>
          <h4>Remark</h4>
          <div className={styles.remark}>
            <textarea name="remark" cols="2" onChange={handleChange} defaultValue={props.router.query.remark || "Sorun görülmemiştir. Genel bakımlar yapılmıştır."} />
          </div>
          {errors.remark && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.remark}
            </p>
          )}

          {postError && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              Some error occurs when creating new repairtment!
            </p>
          )}
          <div className={styles.buttons}>
            <Button type="button" name="create_button" value="create" onClick={() => {
              handleSubmit();
            }}>
              Update Repairment
            </Button>
          </div>
        </form>
      </main>
    </Layout>
  );
}

export default withRouter(UpdateRepairment)