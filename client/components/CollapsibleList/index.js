import React from "react";
import FilterBar from "./FilterBar";
import ListItem from "./ListItem";

export default function CollapsibleList({size, columns, columnSizes, children}) {
  return (
    <div>
      <FilterBar size={size} />
      <ListItem.Header
        sizes={columnSizes}
        data={columns}
      />
        {children}
      
    </div>
  );
}
