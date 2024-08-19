import { RECENT_DAYS } from "@/constants";
import { getStartDate, getTimeRange } from "@/utils/getDate";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const GET = async () => {
  const supabase = createClient();

  try {
    const startDate = getStartDate(RECENT_DAYS);
    const { endOfDayUTC } = getTimeRange();

    const { data, error } = await supabase
      .from("knowhow_posts")
      .select("created_at")
      .gte("created_at", startDate)
      .lt("created_at", endOfDayUTC);

    if (error) {
      throw new Error("게시글 목록을 받아오지 못했습니다");
    }

    console.log("supabase data", data);

    const recentDates = Array.from({ length: RECENT_DAYS }, (_, i) => {
      return dayjs().subtract(i, "day").tz("Asia/Seoul").format("YYYY-MM-DD");
    }).reverse();

    const postCounts: Record<string, number> = recentDates.reduce((acc, date) => {
      acc[date] = 0;
      return acc;
    }, {} as Record<string, number>);

    data!.forEach((post) => {
      const date = dayjs(post.created_at).tz("Asia/Seoul").format("YYYY-MM-DD");
      if (postCounts[date] !== undefined) {
        postCounts[date]++;
      }
    });

    console.log("Post Counts by Date:", postCounts);

    return NextResponse.json(postCounts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
