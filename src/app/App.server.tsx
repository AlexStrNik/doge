/** @jsx dogeBlock */

import { dogeBlock, dogeServer } from "../lib";

import Item from "./Item/Item.server";
import { Ctx } from "./ctx";

export interface AppProps {
  ctx: Ctx;
  items: { name: string }[];
}

const MiniApp: React.FC<AppProps> = dogeServer(({ ctx, items }) => {
  return (
    <div className="server" style={{ background: "red" }}>
      {items.map((item) => (
        <Item ctx={ctx} name={item.name} />
      ))}
    </div>
  );
});

export const App: React.FC<AppProps> = dogeServer(({ ctx, items }) => {
  return (
    <div>
      <h1>Doge renderer</h1>
      <h2>Client look:</h2>
      <MiniApp ctx={ctx} items={items} />
      <h2>Server look:</h2>
      <code>
        <pre>{JSON.stringify(MiniApp({ ctx, items }), null, 4)}</pre>
      </code>
    </div>
  );
});
