import { getStartAndEndOfDay } from "@/utils/getDate";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const supabase = createClient();

  try {
    const { startOfDay, endOfDay } = getStartAndEndOfDay();

    const [votePostResult, knowhowPostResult] = await Promise.all([
      supabase.from("vote_comments").select("created_at").gte("created_at", startOfDay).lte("created_at", endOfDay),

      supabase.from("knowhow_comments").select("created_at").gte("created_at", startOfDay).lte("created_at", endOfDay)
    ]);

    const { data: votePostComments, error: votePostError } = votePostResult;
    const { data: knowhowPostComments, error: knowhowPostError } = knowhowPostResult;

    if (votePostError) {
      throw new Error("투표 게시글 댓글 목록을 받아오지 못했습니다");
    }

    if (knowhowPostError) {
      throw new Error("노하우 게시글 댓글 목록을 받아오지 못했습니다");
    }

    const votePostCommentsCount = votePostComments ? votePostComments.length : 0;
    const knowhowPostCommentsCount = knowhowPostComments ? knowhowPostComments.length : 0;
    const totalCommentsCount = votePostCommentsCount + knowhowPostCommentsCount;

    return NextResponse.json(totalCommentsCount);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
