/** @jsx dogeBlock */

import { dogeBlock, dogeServer } from "../../lib";

import { Ctx } from "../ctx";
import ItemClient from "./Item.client";

export interface ItemProps {
  name: string;
  ctx: Ctx;
}

const Item: React.FC<ItemProps> = ({ ctx, name }) => {
  return <ItemClient name={name} closeLabel={ctx.i18n("close")} />;
};

export default dogeServer(Item);
