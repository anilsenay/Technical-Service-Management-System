import React from "react";
import CollapsibleList from "../../../components/CollapsibleList";
import ListItem from "../../../components/CollapsibleList/ListItem";
import Layout from "../../../components/Layout";

import { format } from 'date-fns'
import FilterBar from "../../../components/CollapsibleList/FilterBar";

export default function ListParts({ data }) {
  const columns = ["ID",
    "Part Name",
    "Part Model",
    "Part Color",
    "Price",
    "Quantity",
    "Box Number"
  ];
  const columnSizes = [0.5, 2.5, 1.5, 1.2, 1, 1, 1];
  console.log(data);
  return (
    <Layout>
      <FilterBar size={data?.length || 0} />
      <CollapsibleList size={data?.length || 0} columns={columns} columnSizes={columnSizes}>
        {data.map(item => {
          return (
            <ListItem sizes={columnSizes} key={item.part.partID}>
              <ListItem.Columns>
                <ListItem.Item isId>{item.part.partID}</ListItem.Item>
                <ListItem.Item >{item.part.partName}</ListItem.Item>
                <ListItem.Item >{item.part.partModel}</ListItem.Item>
                <ListItem.Item >{item.part.partColor || "No color"}</ListItem.Item>
                <ListItem.Item >{item.part.price} TL</ListItem.Item>
                <ListItem.Item >{item.quantity}</ListItem.Item>
                <ListItem.Item >{item.boxNumber}</ListItem.Item>
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

ListParts.getInitialProps = async function ({ query }) {
  let data = {};
  let error = {};

  const res = await fetch('http://localhost:5000/api/storage')
  const json = await res.json()
  return { data: json.storage }

};