import React from "react";

import Input from "../../components/Input";
import Button from "../../components/Button";

import styles from "./settings.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import globalHook from "../../hooks/global.hook";
import { useRouter } from "next/router";

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
  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const router = useRouter();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: user?.firstName,
      surname: user?.lastName,
      email: user?.email,
      phone: user?.phoneNumber,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      fetch('http://localhost:5000/api/employees/update', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, firstName: values.name, lastName: values.surname, email: values.email, phoneNumber: values.phone }),
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
            typeof window !== 'undefined' && localStorage.setItem('user', JSON.stringify({ ...data.user, firstName: values.name, lastName: values.surname, email: values.email, phoneNumber: values.phone }));
            router.push("");
          }
        })
        .catch((e) => {
          console.log(e.toString());
        });
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
            defaultValue={user?.firstName}
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
            defaultValue={user?.lastName}
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
