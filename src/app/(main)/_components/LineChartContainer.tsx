"use client";

import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { UseQueryResult } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import CustomTooltip from "@/app/(main)/_components/CustomBarChart/CustomTooltip";
import dayjs from "dayjs";

type LineChartComponentProps = {
  useQuery: () => UseQueryResult<Record<string, number>, Error>;
};

function LineChartContainer({ useQuery }: LineChartComponentProps) {
  const { data, isPending } = useQuery();
  const maxIndex = data ? Object.keys(data).length - 1 : 0;

  const chartData = data
    ? Object.keys(data).map((date, index) => ({
        date: dayjs(date).format("YYYY.MM.DD"),
        count: data[date],
        index
      }))
    : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      {isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <LoadingSpinner color="text-[#ff5500]" />
        </div>
      ) : (
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip maxIndex={maxIndex} customLabel="누적 가입자 수" dataKey="count" />} />
          <Line type="monotone" dataKey="count" stroke="#ff5500" strokeWidth={2.5} activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}

export default LineChartContainer;
