import { Tables } from "@/types/supabase";

export type TVotesResponse = {
  data: TVote[];
  totalPages: number;
};

export type TVote = Tables<"vote_posts"> & {
  users: {
    nickname: string;
  };
};
