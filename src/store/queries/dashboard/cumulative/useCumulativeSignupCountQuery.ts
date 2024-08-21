import { getCumulativeSignupCount } from "@/apis/dashboard";
import { useQuery } from "@tanstack/react-query";

const useCumulativeSignupCountQuery = () => {
  return useQuery<Record<string, number>, Error>({
    queryKey: ["cumulativeSignUpCount"],
    queryFn: getCumulativeSignupCount
  });
};

export default useCumulativeSignupCountQuery;
