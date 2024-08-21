import { deleteGift, patchGift, postGift } from "@/apis/gift";
import { TNewGift } from "@/types/gift.type";
import { TStatusResponse } from "@/types/index.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useGiftMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addGift } = useMutation<TStatusResponse, Error, TNewGift>({
    mutationFn: (newGift) => postGift(newGift),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gifts"]
      });
    }
  });
  const { mutateAsync: updateGift } = useMutation<TStatusResponse, Error, TNewGift>({
    mutationFn: (updatedGift) => patchGift(updatedGift),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gifts"]
      });
    }
  });
  const { mutateAsync: removeGift } = useMutation<TStatusResponse, Error, number>({
    mutationFn: (giftId) => deleteGift(giftId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gifts"]
      });
    }
  });
  return { addGift, updateGift, removeGift };
};
export default useGiftMutation;
