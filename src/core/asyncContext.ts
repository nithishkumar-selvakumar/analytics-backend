import { AsyncLocalStorage } from "node:async_hooks";

import pino from "pino";

type store = {
  requestId: string;
  logger?: pino.Logger;
  routeName?: string;
  dbMetrics?: {
    totalQueries: number;
    slowQueries: number;
    totalQueryTime: number;
  };
};

export const asyncContext = new AsyncLocalStorage<store>();

export const getContext = () => {
  return asyncContext.getStore();
};
