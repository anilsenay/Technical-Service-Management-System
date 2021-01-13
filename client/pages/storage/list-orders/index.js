import React, { useEffect, useState } from "react";
import CollapsibleList from "../../../components/CollapsibleList";
import ListItem from "../../../components/CollapsibleList/ListItem";
import Layout from "../../../components/Layout";

import { format } from 'date-fns'
import FilterBar from "../../../components/CollapsibleList/FilterBar";

import styles from './list.module.scss';
import { useRouter } from "next/router";

export default function ListOrders({ data }) {
  const [orderedParts, setOrderedParts] = useState([]);
  const columns = ["ID",
    "Order Date",
    "Employee",
    "Total Cost",
    "Confirmed",
  ];
  const columnSizes = [0.5, 1.7, 2, 1.2, 1.5];

  const router = useRouter();

  useEffect(async () => {
    const res = await fetch('http://localhost:5000/api/orders/getOrderedParts')
    const json = await res.json().then(data => setOrderedParts(data.orders))
  }, [])

  const confirm = (orderID, isConfirmed) => {
    fetch('http://localhost:5000/api/orders/updateConfirm', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID, isConfirmed }),
    })
      .then(async (response) => {
        const data = await response.json();
        console.log(response);
        if (!response.ok) {
          const error = (data && data.error) || response.status;
          throw new Error(data.error);
        }
        if (response.ok && data) {
          console.log(data)
          router.push("/storage/list-orders");
        }
      })
      .catch((e) => {
        console.log(e.toString());
      });
  }

  return (
    <Layout>
      <FilterBar size={data?.length || 0} />
      <CollapsibleList size={data?.length || 0} columns={columns} columnSizes={columnSizes}>
        {data.map(item => {
          return (
            <ListItem sizes={columnSizes} key={item.orderID}>
              <ListItem.Columns>
                <ListItem.Item isId>{item.orderID}</ListItem.Item>
                <ListItem.Item>{format(new Date(item.orderDate), "dd-MM-yyyy HH:mm")}</ListItem.Item>
                <ListItem.Item>{item.employeeName}</ListItem.Item>
                <ListItem.Item>{item.totalCost} TL</ListItem.Item>
                <ListItem.Item>{item.isConfirmed ? "Yes" : "No"}</ListItem.Item>
              </ListItem.Columns>
              <ListItem.Content>
                <div className={styles.content}>
                  <ListItem.ContentHeader text="Ordered Parts" />
                  {orderedParts?.map(part => {
                    if (part.orderID === item.orderID)
                      return (
                        <>
                          {<p><span>Part ID:</span>{part.partID}</p>}
                          {<p><span>Part Name:</span>{part.partName}</p>}
                          {<p><span>Part Model:</span>{part.partModel}</p>}
                          {<p><span>Part Price:</span>{part.price}</p>}
                          {<p><span>Quantity:</span>{part.quantity}</p>}
                          <hr />
                        </>
                      )
                  })}
                  <button onClick={() => confirm(item.orderID, item.isConfirmed ? 0 : 1)}>
                    {item.isConfirmed ? "Cancel Confirm" : "Confirm"}
                  </button>
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