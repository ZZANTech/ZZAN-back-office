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
    let query = supabase
      .from("users")
      .select("*", { count: "exact" })
      .order("total_point", { ascending: false })
      .range(offset, offset + limit - 1);

    if (searchOption === "nickname" && searchKeyword) {
      query = query.ilike("nickname", `%${searchKeyword}%`);
    } else if (searchOption === "id" && searchKeyword) {
      query = query.eq("userId", searchKeyword);
    } else if (searchOption === "email" && searchKeyword) {
      query = query.ilike("email", `%${searchKeyword}%`);
    }

    const { data: users, error, count } = await query;

    if (error) {
      throw new Error("유저 목록을 받아오지 못했습니다");
    }

    const usersWithBlockedStatus = await Promise.all(
      users.map(async (user) => {
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(user.userId);

        if (authError) {
          return { ...user, is_blocked: null };
        }

        const isBlocked = authUser?.user.user_metadata?.is_blocked || false;

        return { ...user, is_blocked: isBlocked };
      })
    );

    if (count) {
      const totalPages = Math.ceil(count / limit);
      return NextResponse.json({ data: usersWithBlockedStatus, totalPages });
    } else {
      return NextResponse.json({ data: [], totalPages: 0 });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
