"use client";

import { VOTE_HEADER, VOTE_PAGE_LIMIT } from "@/app/(main)/vote/_constant";
import useVotesQuery from "@/store/queries/vote/useVotesQuery";
import { POST_SELECT_ITEMS } from "@/app/(main)/knowhow/_constant";
import TableContainer from "@/components/TableContainer";
import { TVote } from "@/types/vote.type";
import VoteItem from "@/app/(main)/vote/_components/VoteItem";

function VoteContainer() {
  const query = useVotesQuery;
  return (
    <TableContainer<TVote>
      useQuery={query}
      renderRow={(vote: TVote) => <VoteItem key={vote.vote_postId} vote={vote} />}
      headers={VOTE_HEADER}
      pageLimit={VOTE_PAGE_LIMIT}
      searchOptions={POST_SELECT_ITEMS}
    />
  );
}

export default VoteContainer;
