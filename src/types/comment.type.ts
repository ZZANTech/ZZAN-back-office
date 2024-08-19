export type TComment = {
  comment_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  post_id: number;
  user_id: string;
  is_banned: boolean;
  nickname: string;
  type: "knowhow" | "vote";
};

export type TCommentResponse = {
  data: TComment[];
  totalPages: number;
};

export type TCommentBlockReq = { comment_id: number; type: "knowhow" | "vote"; is_banned: boolean };
