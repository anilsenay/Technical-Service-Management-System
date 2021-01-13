import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ListItem from "../../components/CollapsibleList/ListItem";
import CollapsibleList from "../../components/CollapsibleList";
import Layout from "../../components/Layout";
import globalHook from "../../hooks/global.hook";

import styles from "./dashboard.module.scss";

const Box = ({ children }) => {
  return (<div className={styles.box}>
    {children}
  </div>)
}

export default function dashboard() {
  const [availabilities, setAvailabilities] = useState([])
  const [recentRepairments, setRecentRepairments] = useState([])
  const [repairments, setRepairments] = useState([])
  const [todayRepairments, setTodayRepairments] = useState(0)
  const [dailyEarning, setDailyEarning] = useState(0)
  const [pendingRepairments, setPendingRepairments] = useState(0)

  const columns = ["ID",
    "Status",
    "Device",
    "Employee",
  ];
  const columnSizes = [0.5, 1.2, 1.2, 1];

  const { useGlobalState } = globalHook();
  const { user } = useGlobalState();

  const router = useRouter();

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/employees/availability/" + (user?.ID || "1"))
    const json = await res.json().then(data => setAvailabilities(data.availibilities))
  }, [])

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/employees/getDetailedRepairment/" + (user?.ID || "5"))
    const json = await res.json().then(data => setRepairments(data.detailedRepairment))
  }, [])

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/getRecentRepairments/")
    const json = await res.json().then(data => setRecentRepairments(data.detailedRepairments))
  }, [])

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/getTodaysRepairments/")
    const json = await res.json().then(data => setTodayRepairments(data?.todaysRepairments && data.todaysRepairments[0].Num))
  }, [])

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/getDailyEarnings/")
    const json = await res.json().then(data => setDailyEarning(data?.earnings && data.earnings[0].dailyEarning))
  }, [])

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/api/getPendingRepairments/")
    const json = await res.json().then(data => setPendingRepairments(data.pendingRepairments))
  }, [])

  return (
    <Layout title="Dashboard">

      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.stats}>
            <Box>
              <h4>Daily Repairments</h4>
              <span className={styles.boxCounters}>{todayRepairments || 0}</span>
            </Box>
            <Box>
              <h4>Daily Earning</h4>
              <span className={styles.boxCounters}>{dailyEarning || 0} TL</span>
            </Box>
            <Box>
              <h4>Daily Pending Repairments</h4>
              <span className={styles.boxCounters}>{pendingRepairments?.length || 0}</span>
            </Box>
          </div>
          <div className={styles.recentRepairments}>
            <Box>
              <h3>Recent Repairments</h3>
              {recentRepairments.length === 0 ? <p>No repairment found</p> :
                <CollapsibleList size={recentRepairments?.length || 0} columns={columns} columnSizes={columnSizes} noDetails>
                  {recentRepairments.map(item => {
                    return (
                      <ListItem noDetails sizes={columnSizes} key={item.ID}>
                        <ListItem.Columns>
                          <ListItem.Item isId>{item.ID}</ListItem.Item>
                          <ListItem.Item>{item.repairmentEndDate ? "Completed" : "Pending"}</ListItem.Item>
                          <ListItem.Item>{item.device.deviceID}</ListItem.Item>
                          <ListItem.Item>{item.employee.EmpfirstName} {item.employee.EmplastName}</ListItem.Item>
                        </ListItem.Columns>
                      </ListItem>
                    )
                  })}
                </CollapsibleList>
              }
              <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <button onClick={() => { router.push("/repairments/list-repairments") }}>See all</button>
              </div>
            </Box>
          </div>
        </div>
        <div className={styles.userContainer}>
          <div className={styles.welcomeBack}>
            <h2>Welcome Back, {user ? user.firstName : "Guest"}!</h2>
          </div>
          <Box>
            <h3>My Shifts</h3>
            {availabilities?.map(availability => {
              const hours = format(new Date(availability.startHour), "HH:mm") + "-" + format(new Date(availability.endHour), "HH:mm")
              return (
                <>
                  {availability.dayname === "Monday" && <p><span className={styles.days}>Monday:</span>{hours}</p>}
                  {availability.dayname === "Tuesday" && <p><span className={styles.days}>Tuesday:</span>{hours}</p>}
                  {availability.dayname === "Wednesday" && <p><span className={styles.days}>Wednesday:</span>{hours}</p>}
                  {availability.dayname === "Thursday" && <p><span className={styles.days}>Thursday:</span>{hours}</p>}
                  {availability.dayname === "Friday" && <p><span className={styles.days}>Friday:</span>{hours}</p>}
                  {availability.dayname === "Saturday" && <p><span className={styles.days}>Saturday:</span>{hours}</p>}
                </>
              )
            })}
          </Box>
          <Box>
            <h3>My Last Repairments</h3>
            {repairments.length === 0 ? <p>No repairment found</p> :
              repairments.map(item => {
                return <div key={item.ID}>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 8, marginRight: 8, backgroundColor: item.repairmentEndDate ? "green" : "red" }} />
                    <span className={styles.days}>Model:</span>{item.device.model}
                  </p>
                </div>
              })
            }
            <button onClick={() => { router.push("/repairments/assigned-repairments") }}>See all</button>
          </Box>
        </div>
      </div>
    </Layout>
  );
}
