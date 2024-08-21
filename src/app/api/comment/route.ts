import { TComment } from "@/types/comment.type";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchOption = searchParams.get("searchOption") || "content";
  const searchKeyword = searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  try {
    const { data: searchData, error: searchError } = await supabase.rpc("get_combined_comments", {
      lim: limit,
      off: offset,
      search_option: searchOption,
      search_keyword: searchKeyword
    });

    if (searchError) {
      throw new Error("댓글 목록을 가져오지 못했습니다.");
    }

    if (!searchData || searchData.length === 0) {
      return NextResponse.json({ message: "해당 데이터가 존재하지 않습니다.", data: [], totalPages: 0 });
    }

    const totalCount = (searchData[0] as any)?.total_count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    const cleanedData = searchData.map((item: any) => {
      const { total_count, ...rest } = item;
      return rest as TComment;
    });

    return NextResponse.json({ data: cleanedData, totalPages });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
};
