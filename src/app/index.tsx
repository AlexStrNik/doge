import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { DogeBlock } from "../lib";

import { App } from "./App.server";
import { App as AppClient } from "./App.client";

import template from "./template";
import { Ctx } from "./ctx";

const app = express();

app.get("/", function (req, res) {
  const ctx = new Ctx(req.query.lang === "ru" ? "ru" : "en");

  const items = [{ name: "lol" }, { name: "kek" }];

  // @ts-ignore
  const doge = App({ ctx, items }) as DogeBlock;

  const appString = renderToString(<AppClient doge={doge} />);

  res.send(
    template({
      body: appString,
      title: "Hello World from the server",
    })
  );
});

app.listen(3000, () => {
  console.log("Listen on: http://localhost:3000");
});
