import { AsyncLocalStorage } from "node:async_hooks";

import pino from "pino";

type store = {
  requestId: string;
  logger?: pino.Logger;
};

export const asyncContext = new AsyncLocalStorage<store>();

export const getContext = () => {
  return asyncContext.getStore();
};
