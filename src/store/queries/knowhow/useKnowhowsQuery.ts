import { getKnowhows } from "@/apis/knowhow";
import { POST_SELECT_ITEMS } from "@/app/(main)/knowhow/_constant";
import { useQuery } from "@tanstack/react-query";

const useKnowhowsQuery = (
  page: number,
  limit: number,
  selectedSearchOption: string | undefined,
  searchKeyword: string | undefined
) => {
  return useQuery({
    queryKey: ["knowhows", { page, limit, selectedSearchOption, searchKeyword }],
    queryFn: () => getKnowhows(page, limit, selectedSearchOption || POST_SELECT_ITEMS[0].value, searchKeyword || "")
  });
};

export default useKnowhowsQuery;
