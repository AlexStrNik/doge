import React, { Attributes, FunctionComponent, ReactElement } from "react";

export type DogeBlock = {
  tag: string;
  props: Attributes;
  children: DogeBlock[];
};

type blockFn = (props: Attributes, ...children: DogeBlock[]) => DogeBlock;

export function dogeBlock(
  tag: string | blockFn,
  props: Attributes,
  ...children: DogeBlock[]
): DogeBlock {
  let blockTag = undefined;

  if (typeof tag === "function") {
    //@ts-ignore
    if (tag.serverFC) {
      return tag({ ...props }, ...children.flat());
    } else {
      //@ts-ignore
      blockTag = tag.clientFC;
    }
  } else {
    blockTag = tag;
  }

  return {
    tag: blockTag,
    props: {
      ...props,
    },
    children: children.flat(),
  };
}

declare global {
  var dogeBlocks: {
    [tag: string]: ClientFC<unknown>;
  };
}
global.dogeBlocks = global.dogeBlocks || {};

export function dogeRender(block: DogeBlock): ReactElement {
  console.log("Rendering " + block.tag);

  if (!block.tag) {
    // @ts-ignore
    return block as ReactElement;
  }

  return React.createElement(
    global.dogeBlocks[block.tag] || block.tag,
    block.props,
    ...(block.children || []).map(dogeRender)
  );
}

export function dogeServer<T>(fn: React.FC<T>): ServerFC<T> {
  const nFn = fn as ServerFC<T>;
  nFn.serverFC = true;

  return nFn;
}

export function dogeClient<T>(fn: React.FC<T>, name: string): ClientFC<T> {
  const nFn = fn as ClientFC<T>;
  nFn.clientFC = name;

  global.dogeBlocks[nFn.clientFC] = nFn as ClientFC<unknown>;

  return nFn;
}

type ServerFC<Props> = ((props: Props) => ReactElement) & {
  serverFC: true;
};

type ClientFC<Props> = ((props: Props) => ReactElement) & {
  clientFC: string;
};
