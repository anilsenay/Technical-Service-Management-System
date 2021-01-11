import React from "react";
import FilterBar from "./FilterBar";
import ListItem from "./ListItem";

export default function CollapsibleList() {
  const sizes = [1.3, 1.7, 1.5, 1.5, 1.5, 1.5, 3];
  return (
    <div>
      <FilterBar size={2} />
      <ListItem.Header
        sizes={sizes}
        data={[
          "Repairment ID",
          "Start Date",
          "Status",
          "Device",
          "Customer",
          "Employee",
          "Remark",
        ]}
      />
      <ListItem sizes={sizes}>
        <ListItem.Columns>
          <ListItem.Item isId>1234</ListItem.Item>
          <ListItem.Item>10-01-2021 15:10</ListItem.Item>
          <ListItem.Item>Completed</ListItem.Item>
          <ListItem.Item>15156131151</ListItem.Item>
          <ListItem.Item>Anıl Şenay</ListItem.Item>
          <ListItem.Item>Bilgehan Geçici</ListItem.Item>
          <ListItem.Item>Ekranda çizikler var kötü kullanılmış</ListItem.Item>
        </ListItem.Columns>
        <ListItem.Content>
          <div>
            <ListItem.ContentHeader text="Repairment Details" />
            <div>span</div>
            <p>test</p>
            <ListItem.ContentHeader text="Device Details" />
            <p>testdsd</p>
          </div>
        </ListItem.Content>
      </ListItem>
      <ListItem sizes={sizes}>
        <ListItem.Columns>
          <ListItem.Item isId>1234</ListItem.Item>
          <ListItem.Item>10-01-2021 15:10</ListItem.Item>
          <ListItem.Item>Completed</ListItem.Item>
          <ListItem.Item>15156131151</ListItem.Item>
          <ListItem.Item>Anıl Şenay</ListItem.Item>
          <ListItem.Item>Bilgehan Geçici</ListItem.Item>
          <ListItem.Item>Ekranda çizikler var kötü kullanılmış</ListItem.Item>
        </ListItem.Columns>
        <ListItem.Content>
          <div>
            <ListItem.ContentHeader text="Repairment Details" />
            <div>span</div>
            <p>test</p>
            <ListItem.ContentHeader text="Device Details" />
            <p>testdsd</p>
          </div>
        </ListItem.Content>
      </ListItem>
      <ListItem sizes={sizes}>
        <ListItem.Columns>
          <ListItem.Item isId>1234</ListItem.Item>
          <ListItem.Item>10-01-2021 15:10</ListItem.Item>
          <ListItem.Item>Completed</ListItem.Item>
          <ListItem.Item>15156131151</ListItem.Item>
          <ListItem.Item>Anıl Şenay</ListItem.Item>
          <ListItem.Item>Bilgehan Geçici</ListItem.Item>
          <ListItem.Item>Ekranda çizikler var kötü kullanılmış</ListItem.Item>
        </ListItem.Columns>
        <ListItem.Content>
          <div>
            <ListItem.ContentHeader text="Repairment Details" />
            <div>span</div>
            <p>test</p>
            <ListItem.ContentHeader text="Device Details" />
            <p>testdsd</p>
          </div>
        </ListItem.Content>
      </ListItem>
    </div>
  );
}
