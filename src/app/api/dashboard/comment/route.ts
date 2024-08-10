import { RECENT_DAYS } from "@/constants";
import { getStartDate, getTimeRange } from "@/utils/getDate";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export const GET = async () => {
  const supabase = createClient();

  try {
    const startDate = getStartDate(RECENT_DAYS);
    const { endOfDayUTC } = getTimeRange();

    const { data: knowhowData, error: knowhowError } = await supabase
      .from("knowhow_comments")
      .select("created_at")
      .gte("created_at", startDate)
      .lt("created_at", endOfDayUTC);

    if (knowhowError) {
      throw new Error("노하우 댓글 목록을 받아오지 못했습니다");
    }

    const { data: voteData, error: voteError } = await supabase
      .from("vote_comments")
      .select("created_at")
      .gte("created_at", startDate)
      .lt("created_at", endOfDayUTC);

    if (voteError) {
      throw new Error("투표 댓글 목록을 받아오지 못했습니다");
    }

    const recentDates = Array.from({ length: RECENT_DAYS }, (_, i) => {
      return dayjs().subtract(i, "day").format("YYYY-MM-DD");
    }).reverse();

    const commentCounts: Record<string, number> = recentDates.reduce((acc: Record<string, number>, date: string) => {
      acc[date] = 0;
      return acc;
    }, {} as Record<string, number>);

    knowhowData!.forEach((comment: { created_at: string }) => {
      const date = dayjs(comment.created_at).format("YYYY-MM-DD");
      if (commentCounts[date] !== undefined) {
        commentCounts[date]++;
      }
    });

    voteData!.forEach((comment: { created_at: string }) => {
      const date = dayjs(comment.created_at).format("YYYY-MM-DD");
      if (commentCounts[date] !== undefined) {
        commentCounts[date]++;
      }
    });

    return NextResponse.json(commentCounts);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
