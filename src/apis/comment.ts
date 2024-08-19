import { BASE_URL } from "@/constants";
import { TCommentBlockReq } from "@/types/comment.type";

export const getComments = async (
  page: number = 1,
  limit: number = 10,
  selectedSearchOption: string = "content",
  searchKeyword: string = ""
) => {
  const res = await fetch(
    `${BASE_URL}/api/comment?page=${page}&limit=${limit}&searchOption=${selectedSearchOption}&search=${searchKeyword}`
  );
  const data = await res.json();
  return data;
};

export const patchComment = async (updatedCommentStatus: TCommentBlockReq) => {
  const res = await fetch(`${BASE_URL}/api/comment/${updatedCommentStatus.comment_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedCommentStatus)
  });
  if (!res.ok) {
    throw new Error();
  }
  const data = await res.json();
  return data;
};
