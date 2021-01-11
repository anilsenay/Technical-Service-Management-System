import React from "react";
import { DownArrowIcon } from "../../Icons";

import styles from "./filter.module.scss";

const Select = ({ id, name, children }) => {
  return (
    <div className={styles.selectContainer}>
      <select id={id} name={name}>
        {children}
      </select>
      <DownArrowIcon
        width={10}
        height={10}
        fill="#7f7ffb"
        style={{
          position: "absolute",
          marginTop: "7px",
          right: "0px",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default function FilterBar({ size }) {
  return (
    <div className={styles.container}>
      <span className={styles.showingText}>
        Showing <span className={styles.sizeText}>{size}</span> results
      </span>
      <label for="filter">Filter</label>
      <Select id="filter1" name="filter1">
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </Select>
      <label for="filter">Filter</label>
      <Select id="filter2" name="filter2">
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </Select>
    </div>
  );
}
