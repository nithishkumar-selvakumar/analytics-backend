type dbMetrics = {
  totalQueries: number;
  slowQueries: number;
  averageQueryTime: number;
  totalQueryTime: number;
};

const metrics: dbMetrics = {
  totalQueries: 0,
  slowQueries: 0,
  averageQueryTime: 0,
  totalQueryTime: 0,
};

export function recordQuery(duration: number, isSlow: boolean) {
  metrics.totalQueries += 1;
  metrics.totalQueryTime += duration;
  metrics.averageQueryTime = metrics.totalQueryTime / metrics.totalQueries;

  if (isSlow) {
    metrics.slowQueries += 1;
  }
}

export function getMetrics(): dbMetrics {
  return metrics;
}
