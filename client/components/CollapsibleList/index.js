import React from "react";
import FilterBar from "./FilterBar";
import ListItem from "./ListItem";

export default function CollapsibleList({ noDetails, columns, columnSizes, children }) {
  return (
    <div>
      <ListItem.Header
        sizes={columnSizes}
        data={columns}
        noDetails={noDetails}
      />
      {children}

    </div>
  );
}
