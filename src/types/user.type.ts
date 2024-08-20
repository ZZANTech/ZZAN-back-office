import { Tables } from "@/types/supabase";

export type TUser = Tables<"users"> & {
  is_blocked: boolean;
};

export type TUsersResponse = {
  data: TUser[];
  totalPages: number;
};

export type TUserPointAction = {
  userId: Tables<"users">["userId"];
  points: number;
  reason: string;
};
