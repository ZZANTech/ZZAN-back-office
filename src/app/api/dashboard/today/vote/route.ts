import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { getStartAndEndOfDay } from "@/utils/getDate";

export const GET = async () => {
  const supabase = createClient();

  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay();

    const { data, error } = await supabase
      .from("vote_posts")
      .select("created_at")
      .gte("created_at", startOfDay)
      .lte("created_at", endOfDay);

    if (error) {
      throw new Error("소비평가 목록을 받아오지 못했습니다");
    }

    const voteCount = data ? data.length : 0;

    return NextResponse.json(voteCount);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
