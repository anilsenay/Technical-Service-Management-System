import React from "react";
import SideBarItem from "../SideBarItem";

import styles from "./sidebar.module.scss";

import Logo from "../../assets/logo";

export default function SideBar() {
  return (
    <aside className={styles.container}>
      <section className={styles.logo}>
        <Logo width={251} height={33} />
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"dashboard"}
          text={"Dashboard"}
          link={"/dashboard"}
          isActive={true}
        />
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"repairment"}
          text={"Repairments"}
          link={"/repairments"}
          isActive={false}
        >
          <SideBarItem.SubItem text="New Repairment" />
          <SideBarItem.SubItem text="New Repairment" />
          <SideBarItem.SubItem text="New Repairment" />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={null}
          text={"Repairments"}
          link={"/repairments"}
          isActive={false}
        />
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={null}
          text={"Repairments"}
          link={"/repairments"}
          isActive={false}
        />
      </section>
    </aside>
  );
}
