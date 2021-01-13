import React, { useEffect, useState } from "react";

import styles from "./create-repairment.module.scss";

import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import { useFormik } from "formik";
import * as yup from "yup";

import { DownArrowIcon } from "../../../components/Icons";
import globalHook from "../../../hooks/global.hook";
import { useRouter } from "next/router";

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
  deviceID: yup
    .number()
    .typeError("* Device ID must be include only number")
    .required("* Device ID is required.")
    .min(1, "* Device ID is too short"),
  model: yup
    .string()
    .required("* Model is required.")
    .min(1, "* Model is too short"),
  colorCode: yup
    .string()
    .required("* Color Code is required.")
    .min(1, "* Color Code is too short"),
  serialCode: yup
    .string()
    .required("* Serial Code is required.")
    .min(1, "* Serial Code is too short"),
  warrantyDueDate: yup.date().required("* Warranty Due Date is required."),
  proofOfPurchase: yup.boolean(),
  isInWarranty: yup.boolean(),
  customerName: yup
    .string()
    .required("* Customer Name is required.")
    .min(2, "* Customer Name is too short"),
  customerSurname: yup
    .string()
    .required("* Customer Surname is required.")
    .min(2, "* Customer Surname is too short"),
  phone: yup
    .string()
    .notRequired()
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {
      message: "* Invalid Phone Number",
      excludeEmptyString: true,
    }),
  streetName: yup
    .string()
    .required("* Customer Name is required.")
    .min(2, "* Customer Name is too short"),
  streetNumber: yup
    .string(),
  city: yup
    .string()
    .required("* City is required.")
    .min(2, "* City is too short"),
  country: yup
    .string()
    .required("* Country is required.")
    .min(2, "* Country is too short"),
  zipcode: yup
    .string(),
  type: yup
    .number().required("* You must select case details correctly!")
    .typeError("* You must select case details correctly!"),
  category: yup
    .number().required("* You must select case details correctly!")
    .typeError("* You must select case details correctly!"),
  specification: yup
    .number().required("* You must select case details correctly!")
    .typeError("* You must select case details correctly!"),
  solution: yup
    .string(),
  description: yup
    .string()
    .required("* Description is required.")
    .min(3, "* Description must be min 3 words"),
  remark: yup
    .string()
    .required("* Remark is required.")
    .min(3, "* Remark must be min 3 words"),
  isTech: yup.boolean(),
});

export default function CreateRepairment() {
  const [cases, setCases] = useState();
  const [postError, setPostError] = useState(false);

  const router = useRouter();

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const { handleSubmit, handleChange, setFieldValue, errors, values } = useFormik({
    initialValues: {
      deviceID: "",
      model: "",
      colorCode: "",
      serialCode: "",
      warrantyDueDate: new Date().toISOString(),
      physicalCondition: "",
      proofOfPurchase: false,
      isInWarranty: false,
      customerName: "",
      customerSurname: "",
      phone: "",
      streetName: "",
      streetNumber: "",
      city: "İstanbul",
      country: "Türkiye",
      zipcode: "",
      type: null,
      category: null,
      specification: null,
      solution: 1,
      description: "",
      remark: "",
      isTech: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const sendData = ({ ...values, employeeID: user.ID });

      fetch('http://localhost:5000/api/repairments/insert', {
        method: "POST",
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

  useEffect(async () => {
    const res = await fetch('http://localhost:5000/api/cases/info')
    const json = await res.json().then(data => setCases(data))
  }, [])
  console.log(values.type, values.category, values.specification)
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
                  name="deviceID"
                  onChange={handleChange}
                  noMargin
                  error={errors.name}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Model</span>
                <Input
                  name="model"
                  onChange={handleChange}
                  noMargin
                  error={errors.surname}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Color Code</span>
                <Input
                  name="colorCode"
                  onChange={handleChange}
                  noMargin
                  error={errors.email}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Serial Code</span>
                <Input
                  name="serialCode"
                  onChange={handleChange}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Warranty Due Date</span>
                <input type="date" id="warrantyDueDate" name="warrantyDueDate" className={styles.input} onChange={handleChange} />
              </div>
              <div className={styles.inputContainer}>
                <span>Physical Condition</span>
                <Input
                  name="physicalCondition"
                  onChange={handleChange}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Proof Of Purchase</span>
                <input type="checkbox" className={styles.checkbox} name="proofOfPurchase" onChange={handleChange} />
              </div>
              <div className={styles.inputContainer}>
                <span>Is in warranty</span>
                <input type="checkbox" className={styles.checkbox} name="isInWarranty" onChange={handleChange} />
              </div>

              {errors.deviceID && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.deviceID}
                </p>
              )}
              {errors.model && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.model}
                </p>
              )}
              {errors.colorCode && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.colorCode}
                </p>
              )}
              {errors.serialCode && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.serialCode}
                </p>
              )}
            </div>
            <hr />
            <div className={styles.accountContainer}>
              <h4>Customer Details</h4>
              <div className={styles.inputContainer}>
                <span>Name</span>
                <Input
                  name="customerName"
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
                  name="customerSurname"
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
                <span>Street Name</span>
                <Input
                  name="streetName"
                  onChange={handleChange}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Street Number</span>
                <Input
                  name="streetNumber"
                  onChange={handleChange}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>City</span>
                <Input
                  name="city"
                  onChange={handleChange}
                  defaultValue="İstanbul"
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Country</span>
                <Input
                  name="country"
                  onChange={handleChange}
                  defaultValue="Türkiye"
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Zipcode</span>
                <Input
                  name="zipcode"
                  onChange={handleChange}
                  noMargin
                  error={errors.phone}
                  border
                  smallSize
                />
              </div>
              {errors.customerName && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.customerName}
                </p>
              )}
              {errors.customerSurname && (
                <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
                  {errors.customerSurname}
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
                <select id="type" name="type" onChange={handleChange}>
                  <option value={null}>Select a type</option>
                  {cases?.types?.map(item => {
                    return <option value={+item.ID}>{item.type}</option>
                  })}
                </select>
                <DownArrow />
              </div>
            </div>
            <div className={styles.case}>
              <label>Case Category</label>
              <div className={styles.selectContainer}>
                <select id="category" name="category" onChange={handleChange}>
                  <option value={null}>Select a category</option>
                  {cases?.categories?.map(item => {
                    return values.type == item.caseType && <option value={+item.ID}>{item.category}</option>
                  })}
                </select>
                <DownArrow />
              </div>
            </div>
            <div className={styles.case}>
              <label>Case Specification</label>
              <div className={styles.selectContainer}>
                <select id="specification" name="specification" onChange={handleChange} >
                  <option value={null} >Select a specification</option>
                  {cases?.specifications?.map(item => {
                    return values.category == item.caseCategory && <option value={+item.ID}>{item.specification}</option>
                  })}
                </select>
                <DownArrow />
              </div>
            </div>
            <div className={styles.case}>
              <label>Solution Type</label>
              <div className={styles.selectContainer}>
                <select id="solution" name="solution">
                  <option value="factory-reset">Factory Reset</option>
                  <option value="smart-upgrade">Smart Upgrade</option>
                </select>
                <DownArrow />
              </div>
            </div>
          </div>
          <div style={{ marginRight: 36, marginTop: 4 }}>
            <div className={styles.case}>
              <label>Case Description</label>
              <textarea name="description" cols="2" onChange={handleChange} />
            </div>
          </div>
          {errors.description && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.description}
            </p>
          )}
          <h4>Remark</h4>
          <div className={styles.remark}>
            <textarea name="remark" cols="2" onChange={handleChange} />
          </div>
          {errors.remark && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.remark}
            </p>
          )}
          {(errors.type || errors.category || errors.specification) && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.type}
            </p>
          )}

          {postError && (
            <p style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              Some error occurs when creating new repairtment!
            </p>
          )}
          <div className={styles.buttons}>
            <Button type="button" name="create_button" value="create" onClick={() => {
              setFieldValue('isTech', false);
              handleSubmit();
            }}>
              Create Repairment
            </Button>
            <Button type="submit" name="assign_button" value="assign" onClick={() => {
              setFieldValue('isTech', true);
              handleSubmit();
            }}>
              Assign Repairment
            </Button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
