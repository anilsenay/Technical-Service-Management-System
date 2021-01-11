import React, { useState } from "react";

import styles from "./input.module.scss";

export default function Input({
  onChange,
  required = true,
  error,
  noMargin,
  border,
  ...props
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      className={styles.container}
      style={{
        borderColor: error && "red",
        backgroundColor: focus && "white",
        margin: noMargin && 0,
        borderColor: border && "#d6d3d3",
        borderWidth: border && 2,
      }}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...props}
    />
  );
}
