import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStartDate = (days: number): string => {
  const date = dayjs().tz("Asia/Seoul").subtract(days, "day").startOf("day");
  const startOfDayUTC = date.utc().format();
  return startOfDayUTC;
};
//
export const getTimeRange = () => {
  const now = dayjs().tz("Asia/Seoul");
  const startOfDayKST = now.startOf("day");
  const endOfDayKST = now.endOf("day");

  const startOfDayUTC = startOfDayKST.utc().format();
  const endOfDayUTC = endOfDayKST.utc().format();

  return { startOfDayUTC, endOfDayUTC };
};

export const getRecentDates = (days: number): string[] => {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = dayjs().tz("Asia/Seoul").subtract(i, "day").startOf("day").format("YYYY-MM-DD");

    dates.push(date);
  }
  return dates;
};

export const getStartAndEndOfDay = (timezone: string = "Asia/Seoul") => {
  const today = dayjs().tz(timezone);
  const startOfDay = today.startOf("day").toISOString();
  const endOfDay = today.endOf("day").toISOString();
  return { startOfDay, endOfDay };
};
