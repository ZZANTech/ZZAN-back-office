import { getVotes } from "@/apis/vote";
import { POST_SELECT_ITEMS } from "@/app/(main)/knowhow/_constant";
import { TVotesResponse } from "@/types/vote.type";
import { useQuery } from "@tanstack/react-query";

const useVotesQuery = (
  page: number,
  limit: number,
  selectedSearchOption: string | undefined,
  searchKeyword: string | undefined
) => {
  return useQuery<TVotesResponse, Error>({
    queryKey: ["votes", { page, limit, selectedSearchOption, searchKeyword }],
    queryFn: () => getVotes(page, limit, selectedSearchOption || POST_SELECT_ITEMS[0].value, searchKeyword || "")
  });
};

export default useVotesQuery;
