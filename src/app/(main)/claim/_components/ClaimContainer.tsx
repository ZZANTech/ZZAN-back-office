"use client";

import TableContainer from "@/components/TableContainer";
import useClaimsQuery from "@/store/queries/claim/useClaimsQuery";
import { CLAIM_HEADERS, CLAIM_PAGE_LIMIT, CLAIM_SELECT_ITEMS } from "@/app/(main)/claim/_constant";
import { TClaim } from "@/types/claim.type";
import ClaimItem from "@/app/(main)/claim/_components/ClaimItem";

function ClaimContainer() {
  const query = useClaimsQuery;
  return (
    <TableContainer<TClaim>
      useQuery={query}
      renderRow={(claim: TClaim) => <ClaimItem key={claim.gift_claimId} claim={claim} />}
      headers={CLAIM_HEADERS}
      pageLimit={CLAIM_PAGE_LIMIT}
      searchOptions={CLAIM_SELECT_ITEMS}
    />
  );
}

export default ClaimContainer;
