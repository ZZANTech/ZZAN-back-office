import { getGifts } from "@/apis/gift";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const useGiftsQuery = () => {
  return useQuery<Tables<"gifts">[], Error>({
    queryKey: ["gifts"],
    queryFn: () => getGifts()
  });
};

export default useGiftsQuery;
