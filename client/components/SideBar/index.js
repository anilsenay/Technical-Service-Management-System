import React from "react";
import { useRouter } from "next/router";

import SideBarItem from "../SideBarItem";

import styles from "./sidebar.module.scss";

import Logo from "../../assets/logo";

export default function SideBar() {
  const router = useRouter();
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
          isActive={router?.pathname.includes("dashboard")}
        />
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"repairment"}
          text={"Repairments"}
          link={"/repairments"}
          isActive={router?.pathname.includes("repairment")}
        >
          <SideBarItem.SubItem
            text="Create Repairment"
            link="/repairments/create-repairment"
            isActive={router?.pathname.includes("create-repairment")}
          />
          <SideBarItem.SubItem
            text="List Repairments"
            link="/repairments/list-repairments"
            isActive={router?.pathname.includes("list-repairments")}
          />
          <SideBarItem.SubItem
            text="Assigned Repairments"
            link="/repairments/assigned-repairments"
            isActive={router?.pathname.includes("assigned-repairments")}
          />
          <SideBarItem.SubItem
            text="Pending Repairments"
            link="/repairments/pending-repairments"
            isActive={router?.pathname.includes("pending-repairments")}
          />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"storage"}
          text={"Storage"}
          link={"/storage"}
          isActive={router?.pathname.includes("storage")}
        >
          <SideBarItem.SubItem
            text="New Order"
            link="/storage/new-order"
            isActive={router?.pathname.includes("new-order")}
          />
          <SideBarItem.SubItem
            text="List Orders"
            link="/storage/list-orders"
            isActive={router?.pathname.includes("list-orders")}
          />
          <SideBarItem.SubItem
            text="Add New Part"
            link="/storage/add-part"
            isActive={router?.pathname.includes("add-part")}
          />
          <SideBarItem.SubItem
            text="List Parts"
            link="/storage/list-parts"
            isActive={router?.pathname.includes("list-parts")}
          />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"man"}
          text={"Employees"}
          link={"/employees"}
          isActive={router?.pathname.includes("employee")}
        >
          <SideBarItem.SubItem
            text="Register Employee"
            link="/employees/register-employee"
            isActive={router?.pathname.includes("register-employee")}
          />
          <SideBarItem.SubItem
            text="List Employees"
            link="/employees/list-employees"
            isActive={router?.pathname.includes("list-employees")}
          />
          <SideBarItem.SubItem
            text="Employee Stats"
            link="/employees/employee-stats"
            isActive={router?.pathname.includes("employee-stats")}
          />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"payment"}
          text={"Payments"}
          link={"/payments"}
          isActive={router?.pathname.includes("payment")}
        >
          <SideBarItem.SubItem
            text="New Payment"
            link="/payments/new-payment"
            isActive={router?.pathname.includes("new-payment")}
          />
          <SideBarItem.SubItem
            text="List Payments"
            link="/payments/list-payments"
            isActive={router?.pathname.includes("list-payments")}
          />
        </SideBarItem>
      </section>
      <section className={styles.itemContainer}>
        <SideBarItem
          icon={"settings"}
          text={"Settings"}
          link={"/settings"}
          isActive={router?.pathname.includes("settings")}
        />
      </section>
    </aside>
  );
}
