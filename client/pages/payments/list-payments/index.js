import React from "react";
import CollapsibleList from "../../../components/CollapsibleList";
import ListItem from "../../../components/CollapsibleList/ListItem";
import Layout from "../../../components/Layout";

import { format } from 'date-fns'
import FilterBar from "../../../components/CollapsibleList/FilterBar";

import styles from './list.module.scss';

export default function ListPayments({ data }) {
  const columns = ["ID",
    "Repairment ID",
    "Order Date",
    "Accountant",
    "Cost",
    "Payment Method",
  ];
  const columnSizes = [0.7, 1.7, 2, 2, 1.5, 2];
  console.log(data);
  return (
    <Layout>
      <FilterBar size={data?.length || 0} />
      <CollapsibleList size={data?.length || 0} columns={columns} columnSizes={columnSizes}>
        {data.map(item => {
          return (
            <ListItem sizes={columnSizes} key={item.ID}>
              <ListItem.Columns>
                <ListItem.Item isId>{item.ID}</ListItem.Item>
                <ListItem.Item>{item.repairmentID}</ListItem.Item>
                <ListItem.Item>{format(new Date(item.date), "dd-MM-yyyy HH:mm")}</ListItem.Item>
                <ListItem.Item>{item.accountantName}</ListItem.Item>
                <ListItem.Item>{item.totalCost} TL</ListItem.Item>
                <ListItem.Item>{item.methodName}</ListItem.Item>
              </ListItem.Columns>
              <ListItem.Content>
                <div className={styles.content}>
                  <ListItem.ContentHeader text="Device Details" />
                  {<p><span>Device ID:</span>{item.deviceID}</p>}
                  {<p><span>Repairment Start:</span>{format(new Date(item.repairmentStartDate), "dd-MM-yyyy HH:mm")}</p>}
                  {<p><span>Repairment End:</span>{item.repairmentEndDate ? format(new Date(item.repairmentEndDate), "dd-MM-yyyy HH:mm") : "-"}</p>}
                  {<p><span>Remark:</span>{item.remark}</p>}
                  {<p><span>Employee ID:</span>{item.employeeID}</p>}
                  <ListItem.ContentHeader text="Customer Details" />
                  {<p><span>First Name:</span>{item.firstName}</p>}
                  {<p><span>Last Name:</span>{item.lastName}</p>}
                  {<p><span>Phone Number:</span>{item.phoneNumber}</p>}
                  <ListItem.ContentHeader text="Customer Address Details" />
                  {<p><span>Street Name:</span>{item.streetName}</p>}
                  {<p><span>Street Name:</span>{item.streetNumber}</p>}
                  {<p><span>Street Name:</span>{item.city}</p>}
                  {<p><span>Street Name:</span>{item.country}</p>}
                  {<p><span>Street Name:</span>{item.zipcode}</p>}
                </div>
              </ListItem.Content>
            </ListItem>
          )
        })}

      </CollapsibleList>
    </Layout>
  );
}

ListPayments.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};

  const res = await fetch('http://localhost:5000/api/payments')
  const json = await res.json()
  return { data: json.payments }

};