import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchOption = searchParams.get("searchOption") || "nickname";
  const searchKeyword = searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  try {
    const { data: giftClaims, error } = await supabase.rpc("get_filtered_gift_claims", {
      lim: limit,
      off: offset,
      search_option: searchOption,
      search_keyword: searchKeyword
    });
    if (error) {
      console.log(error);
      throw new Error("기프티콘 신청 내역을 가져오지 못했습니다.");
    }

    if (giftClaims && giftClaims.length > 0) {
      const totalCount = giftClaims[0].total_count;
      const totalPages = Math.ceil(totalCount / limit);
      const cleanedData = giftClaims.map(({ total_count, ...rest }) => rest);

      return NextResponse.json({ data: cleanedData, totalPages });
    } else {
      return NextResponse.json({ data: [], totalPages: 0 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다." }, { status: 500 });
    }
  }
};

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();
  const updatedClaim = await req.json();
  try {
    const { status, statusText } = await supabase
      .from("gift_claims")
      .update(updatedClaim)
      .eq(`gift_claimId`, updatedClaim.gift_claimId)
      .single();
    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
