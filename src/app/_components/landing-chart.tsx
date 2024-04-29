"use client";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RequestData {
  date: string;
  requests: number;
}

export default function RequestsChart({ data }: { data: RequestData[] }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-40" />
          <XAxis dataKey="date" />
          <Tooltip />
          <Area
            connectNulls
            type="monotone"
            dataKey="requests"
            className="fill-primary"
            fill="primary"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
