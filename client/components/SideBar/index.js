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
            link="/repairments/create-repairment"
          />
          <SideBarItem.SubItem
            text="List Repairments"
            link="/repairments/list-repairments"
          />
          <SideBarItem.SubItem
            text="Assigned Repairment"
            link="/repairments/assigned-repairments"
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
          <SideBarItem.SubItem text="New Order" link="/storage/new-order" />
          <SideBarItem.SubItem text="List Orders" link="/storage/list-orders" />
          <SideBarItem.SubItem text="Add New Part" link="/storage/add-part" />
          <SideBarItem.SubItem text="List Parts" link="/storage/list-parts" />
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
            link="/employees/register-employee"
          />
          <SideBarItem.SubItem
            text="List Employees"
            link="/employees/list-employees"
          />
          <SideBarItem.SubItem text="Add New Part" link="/employees/add-part" />
          <SideBarItem.SubItem
            text="Employee Stats"
            link="/employees/employee-stats"
          />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"payment"}
          text={"Payments"}
          link={"/payments"}
          isActive={false}
        >
          <SideBarItem.SubItem
            text="New Payment"
            link="/payments/new-payment"
          />
          <SideBarItem.SubItem
            text="List Payments"
            link="/payments/list-payments"
          />
        </SideBarItem>
      </section>
    </aside>
  );
}
