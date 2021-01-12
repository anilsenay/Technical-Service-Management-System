import React, { useState } from "react";

import styles from "./input.module.scss";

export default function Input({
  onChange,
  required = true,
  error,
  noMargin,
  smallSize,
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
        margin: (noMargin || smallSize) && 0,
        borderColor: border && "#d6d3d3",
        borderWidth: border && 2,
        paddingTop: smallSize && 4,
        paddingBottom: smallSize && 4,
        borderRadius: smallSize && 6,
      }}
      onChange={onChange}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      {...props}
    />
  );
}
