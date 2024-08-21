import { patchClaim } from "@/apis/claim";
import { TStatusResponse } from "@/types/index.type";
import { TClaim } from "@/types/claim.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useClaimMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateClaim } = useMutation<TStatusResponse, Error, Partial<TClaim>>({
    mutationFn: (updatedVote) => patchClaim(updatedVote),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["claims"]
      });
    }
  });
  return { updateClaim };
};
export default useClaimMutation;
