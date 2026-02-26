import { query } from "../../db/query.js";

export async function insertEvent(data: {
  userId: string;
  eventName: string;
  value?: number;
}) {
  const rows = await query(
    `INSERT INTO events (userId,eventName,value) 
        VALUES ($1,$2,$3)
         RETURNING *`,
    [data.userId, data.eventName, data?.value ?? null],
    { queryName: "insert-event" },
  );

  return rows[0];
}
