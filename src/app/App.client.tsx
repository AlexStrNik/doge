import React from "react";

import { DogeBlock, dogeRender } from "../lib";

export const App: React.FC<{ doge: DogeBlock }> = (props) => {
  return dogeRender(props.doge);
};
