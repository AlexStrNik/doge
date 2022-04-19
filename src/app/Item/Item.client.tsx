import React from "react";
import { dogeClient } from "../../lib";

export interface ItemProps {
  name: string;
  closeLabel: string;
}

const Item: React.FC<ItemProps> = ({ name, closeLabel }) => {
  return (
    <div>
      <p>{name}</p>
      <button>{closeLabel}</button>
    </div>
  );
};
export default dogeClient(Item, "Item");
