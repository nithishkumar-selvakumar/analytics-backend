import { query } from "../../db/query.js";

export async function incrementDailyCount(eventName: string) {
  await query(
    `INSERT INTO event_daily_counts (event_name, event_date, total_count)
     VALUES ($1, CURRENT_DATE, 1)
     ON CONFLICT (event_name, event_date)
     DO UPDATE SET total_count = event_daily_counts.total_count + 1 `,
    [eventName],
    { queryName: "increment-daily-count" },
  );
}

export async function incrementUserSummary(userId: string, eventName: string) {
  await query(
    `
    INSERT INTO user_event_summary (user_id, event_name, total_count)
    VALUES ($1, $2, 1)
    ON CONFLICT (user_id, event_name)
    DO UPDATE SET total_count = user_event_summary.total_count + 1
    `,
    [userId, eventName],
    { queryName: "increment-user-summary" },
  );
}
