import React, { useEffect, useState } from "react";
import CollapsibleList from "../../../components/CollapsibleList";
import ListItem from "../../../components/CollapsibleList/ListItem";
import Layout from "../../../components/Layout";

import { format } from "date-fns";
import { TickIcon } from "../../../components/Icons";

import styles from "./list.module.scss";
import FilterBar from "../../../components/CollapsibleList/FilterBar";

const Tick = ({ active }) => {
  return (
    <TickIcon width={16} height={16} fill={active ? "#7f7ffb" : "#D3D3D3"} />
  );
};

export default function ListEmployees({ data }) {
  const [availabilities, setAvailabilities] = useState([]);

  const columns = [
    "ID",
    "Employee",
    "Username",
    "Manager",
    "Smart",
    "Technician",
    "Storage",
    "Tester",
    "Accountant",
  ];
  const columnSizes = [0.2, 1, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

  useEffect(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/employees/availabilities`
    );
    const json = await res
      .json()
      .then((data) => setAvailabilities(data.availabilities));
  }, []);

  return (
    <Layout title="Employee List">
      <FilterBar size={data?.length || 0} />
      <CollapsibleList
        size={data?.length || 0}
        columns={columns}
        columnSizes={columnSizes}
      >
        {data.map((item) => {
          return (
            <ListItem sizes={columnSizes} key={item.ID}>
              <ListItem.Columns>
                <ListItem.Item isId>{item.ID}</ListItem.Item>
                <ListItem.Item>
                  {item.firstName} {item.lastName}
                </ListItem.Item>
                <ListItem.Item>{item.username}</ListItem.Item>
                <ListItem.Item>
                  {item.isManager ? <Tick active /> : <Tick />}
                </ListItem.Item>
                <ListItem.Item>
                  {item.isSmartService ? <Tick active /> : <Tick />}
                </ListItem.Item>
                <ListItem.Item>
                  {item.isTechnician ? <Tick active /> : <Tick />}
                </ListItem.Item>
                <ListItem.Item>
                  {item.isStorageMan ? <Tick active /> : <Tick />}
                </ListItem.Item>
                <ListItem.Item>
                  {item.isTester ? <Tick active /> : <Tick />}
                </ListItem.Item>
                <ListItem.Item>
                  {item.isAccountant ? <Tick active /> : <Tick />}
                </ListItem.Item>
              </ListItem.Columns>
              <ListItem.Content>
                <div className={styles.contentContainer}>
                  <div className={styles.content}>
                    <ListItem.ContentHeader text="Employee Details" />
                    <p>
                      <span>Phone Number:</span>
                      {item.phoneNumber}
                    </p>
                    <p>
                      <span>Email:</span>
                      {item.email}
                    </p>
                    <p>
                      <span>Address:</span>
                      {item.address}
                    </p>
                    <p>
                      <span>Date Of Birth:</span>
                      {format(new Date(item.dateOfBirth), "dd-MM-yyyy HH:mm")}
                    </p>
                    <p>
                      <span>Start Date:</span>
                      {format(new Date(item.startDate), "dd-MM-yyyy HH:mm")}
                    </p>
                  </div>
                  <div className={styles.content}>
                    <ListItem.ContentHeader text="Employee Availability" />
                    {availabilities?.map((availability) => {
                      const hours =
                        format(new Date(availability.startHour), "HH:mm") +
                        "-" +
                        format(new Date(availability.endHour), "HH:mm");
                      if (availability.employeeID === item.ID)
                        return (
                          <>
                            {availability.monday && (
                              <p>
                                <span>Monday:</span>
                                {hours}
                              </p>
                            )}
                            {availability.tuesday && (
                              <p>
                                <span>Tuesday:</span>
                                {hours}
                              </p>
                            )}
                            {availability.wednesday && (
                              <p>
                                <span>Wednesday:</span>
                                {hours}
                              </p>
                            )}
                            {availability.thursday && (
                              <p>
                                <span>Thursday:</span>
                                {hours}
                              </p>
                            )}
                            {availability.friday && (
                              <p>
                                <span>Friday:</span>
                                {hours}
                              </p>
                            )}
                            {availability.saturday && (
                              <p>
                                <span>Saturday:</span>
                                {hours}
                              </p>
                            )}
                          </>
                        );
                    })}
                  </div>
                </div>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </CollapsibleList>
    </Layout>
  );
}

ListEmployees.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees`);
  const json = await res.json();

  return { data: json.employees };
};
