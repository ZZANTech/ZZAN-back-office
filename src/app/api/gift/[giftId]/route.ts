import { STORAGE_BASE_URL } from "@/constants";
import { createClient } from "@/utils/supabase/server";
import { uploadFileToSupabase } from "@/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params: { giftId } }: { params: { giftId: number } }) => {
  const supabase = createClient();

  try {
    if (giftId) {
      const { data, error } = await supabase.from("gifts").select("*").eq("giftId", giftId).single();
      if (error) {
        throw new Error("기프티콘 목록을 가져오지 못했습니다");
      }
      return NextResponse.json(data);
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const PATCH = async (req: NextRequest) => {
  const supabase = createClient();

  try {
    const formData = await req.formData();
    const giftId = parseInt(formData.get("giftId") as string, 10);
    const giftName = formData.get("gift_name") as string;
    const point = formData.get("point") as string;
    const category = formData.get("category") as string;
    const brandName = formData.get("brand_name") as string;
    const imgFile = formData.get("img_file") as File | null;

    const updatedGift: Record<string, any> = {
      gift_name: giftName,
      point: Number(point),
      category,
      brand_name: brandName
    };

    if (imgFile) {
      const bucketName = "gifts";
      const fileName = `${category}/${crypto.randomUUID()}-${imgFile.name}`;

      const { data, error } = await uploadFileToSupabase(supabase, bucketName, fileName, imgFile);

      if (error) {
        throw new Error(error.message);
      }

      const img_url = `${STORAGE_BASE_URL}/${data.fullPath}`;

      updatedGift.img_url = img_url;
    }

    const {
      status,
      statusText,
      error: updateError
    } = await supabase.from("gifts").update(updatedGift).eq("giftId", Number(giftId));

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({ status, statusText });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};

export const DELETE = async (req: NextRequest, { params: { giftId } }: { params: { giftId: number } }) => {
  const supabase = createClient();

  try {
    if (giftId) {
      const { status, statusText, error } = await supabase.from("gifts").delete().eq("giftId", giftId);

      console.log(status, statusText, error);

      return NextResponse.json({ status, statusText });
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "알 수 없는 에러가 발생했습니다" }, { status: 500 });
    }
  }
};
