import { getGift } from "@/apis/gift";
import { Tables } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const useGiftQuery = (giftId: number) => {
  return useQuery<Tables<"gifts">, Error>({
    queryKey: ["gifts"],
    queryFn: () => getGift(giftId)
  });
};

export default useGiftQuery;
