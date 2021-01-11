import React, { useState } from "react";
import { DownArrowIcon } from "../../Icons";

import styles from "./item.module.scss";

export default function ListItem({ sizes, children }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  console.log(children);
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <a
          className={toggleMenu ? styles.arrow_up : styles.arrow_down}
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <DownArrowIcon width={14} height={14} fill="#94969C" />
        </a>
        <div
          className={styles.items}
          style={{
            gridTemplateColumns: sizes.join("fr ") + "fr",
          }}
        >
          {children.length > 0 ? children[0] : children}
        </div>
      </div>
      {children.length > 0 && toggleMenu && children[1]}
    </div>
  );
}

ListItem.Columns = ({ children }) => {
  return children;
};

ListItem.Item = ({ isId, children }) => {
  return <span className={isId && styles.primary}>{children}</span>;
};

ListItem.Header = ({ data, sizes }) => {
  return (
    <div
      className={styles.container}
      style={{ border: 0, margin: 0, backgroundColor: "transparent" }}
    >
      <div className={styles.column}>
        <div style={{ width: 48, height: 26 }}></div>
        <div
          className={styles.items}
          style={{
            gridTemplateColumns: sizes.join("fr ") + "fr",
          }}
        >
          {data.map((item) => (
            <span>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

ListItem.Content = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};

ListItem.ContentHeader = ({ text }) => {
  return <h4>{text}</h4>;
};
