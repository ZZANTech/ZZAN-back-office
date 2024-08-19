import { Tables } from "@/types/supabase";

export type TKnowhowsResponse = {
  data: TKnowhow[];
  totalPages: number;
};

export type TKnowhow = Tables<"knowhow_posts"> & {
  users: {
    nickname: string;
  };
};
