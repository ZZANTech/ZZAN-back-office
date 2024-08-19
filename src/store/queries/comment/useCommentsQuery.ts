import { getComments } from "@/apis/comment";
import { TCommentResponse } from "@/types/comment.type";
import { useQuery } from "@tanstack/react-query";

const useCommentsQuery = (
  page: number,
  limit: number,
  selectedSearchOption: string | undefined,
  searchKeyword: string | undefined
) => {
  return useQuery<TCommentResponse, Error>({
    queryKey: ["comments", { page, limit, selectedSearchOption, searchKeyword }],
    queryFn: () => getComments(page, limit, selectedSearchOption || "content", searchKeyword || "")
  });
};

export default useCommentsQuery;
