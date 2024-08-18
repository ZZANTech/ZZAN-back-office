"use client";

import { VOTE_PAGE_LIMIT } from "@/app/(main)/vote/_constant";
import useVotesQuery from "@/store/queries/vote/useVotesQuery";
import { POST_SELECT_ITEMS } from "@/app/(main)/knowhow/_constant";
import TableContainer from "@/components/TableContainer";
import { TVote } from "@/types/vote.type";
import VoteItem from "@/app/(main)/vote/_components/VoteItem";

const voteHeader = ["짠 소비 아이디", "작성 일시", "제목", "작성자 닉네임", "게시글 규제"];

function VoteContainer() {
  const query = useVotesQuery;
  return (
    <TableContainer<TVote>
      useQuery={query}
      renderRow={(vote: TVote) => <VoteItem key={vote.vote_postId} vote={vote} />}
      headers={voteHeader}
      pageLimit={VOTE_PAGE_LIMIT}
      searchOptions={POST_SELECT_ITEMS}
    />
  );
}

export default VoteContainer;
