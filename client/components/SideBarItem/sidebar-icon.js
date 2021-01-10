import React from "react";

import {
  DashboardIcon,
  ManIcon,
  PaymentIcon,
  RepairmentIcon,
  StorageIcon,
} from "../Icons";

export default function SidebarIcon({ icon, isActive }) {
  if (icon === "dashboard")
    return (
      <DashboardIcon
        width={20}
        height={20}
        fill={isActive ? "#7F7FFB" : "#94969C"}
        stroke={isActive ? "#7F7FFB" : "#94969C"}
      />
    );
  else if (icon === "repairment")
    return (
      <RepairmentIcon
        width={20}
        height={20}
        fill={isActive ? "#7F7FFB" : "#94969C"}
      />
    );
  else if (icon === "storage")
    return (
      <StorageIcon
        width={20}
        height={20}
        fill={isActive ? "#7F7FFB" : "#94969C"}
        stroke={isActive ? "#7F7FFB" : "#94969C"}
      />
    );
  else if (icon === "man")
    return (
      <ManIcon
        width={20}
        height={20}
        fill={isActive ? "#7F7FFB" : "#94969C"}
        stroke={isActive ? "#7F7FFB" : "#94969C"}
      />
    );
  else if (icon === "payment")
    return (
      <PaymentIcon
        width={20}
        height={20}
        fill={isActive ? "#7F7FFB" : "#94969C"}
      />
    );
  else return null;
}
