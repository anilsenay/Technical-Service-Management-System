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
          <SideBarItem.SubItem
            text="Create Repairment"
            link="create-repairment"
          />
          <SideBarItem.SubItem text="List Repairments" link="list-repairment" />
          <SideBarItem.SubItem
            text="Assigned Repairment"
            link="assigned-repairment"
          />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"storage"}
          text={"Storage"}
          link={"/storage"}
          isActive={false}
        >
          <SideBarItem.SubItem text="New Order" link="new-order" />
          <SideBarItem.SubItem text="List Orders" link="list-orders" />
          <SideBarItem.SubItem text="Add New Part" link="add-part" />
          <SideBarItem.SubItem text="List Parts" link="list-parts" />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"man"}
          text={"Employees"}
          link={"/employees"}
          isActive={false}
        >
          <SideBarItem.SubItem
            text="Register Employee"
            link="register-employee"
          />
          <SideBarItem.SubItem text="List Employees" link="list-employees" />
          <SideBarItem.SubItem text="Add New Part" link="add-part" />
          <SideBarItem.SubItem text="Employee Stats" link="employee-stats" />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"payment"}
          text={"Payments"}
          link={"/payments"}
          isActive={false}
        >
          <SideBarItem.SubItem text="New Payment" link="new-payment" />
          <SideBarItem.SubItem text="List Payments" link="list-payments" />
        </SideBarItem>
      </section>
    </aside>
  );
}
