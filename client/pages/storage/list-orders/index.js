import React from "react";
import CollapsibleList from "../../../components/CollapsibleList";
import ListItem from "../../../components/CollapsibleList/ListItem";
import Layout from "../../../components/Layout";

import {format} from 'date-fns'

export default function ListOrders({data}) {
  const columns = ["ID",
  "Order Date",
  "Employee",
  "Total Cost",
  "Confirmed",
  ];
  const columnSizes = [0.5, 1.7, 2, 1.2, 1.5];
  console.log(data);
  return (
    <Layout>
      <CollapsibleList size={data.length} columns={columns} columnSizes={columnSizes}>
        {data.map(item => {
          return (
            <ListItem sizes={columnSizes}>
              <ListItem.Columns>
                <ListItem.Item isId>{item.orderID}</ListItem.Item>
                <ListItem.Item>{format(new Date(item.orderDate), "dd-MM-yyyy HH:mm")}</ListItem.Item>
                <ListItem.Item>{item.employeeName}</ListItem.Item>
                <ListItem.Item>{item.totalCost} TL</ListItem.Item>
                <ListItem.Item>{item.isConfirmed ? "Yes" : "No"}</ListItem.Item>
              </ListItem.Columns>
              <ListItem.Content>
                  <div >

                </div>
              </ListItem.Content>
            </ListItem>
          )
        })}
        
      </CollapsibleList>
    </Layout>
  );
}

ListOrders.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};

  const res = await fetch('http://localhost:5000/api/orders')
  const json = await res.json()
  return { data: json.orders }

};