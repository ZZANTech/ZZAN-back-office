"use client";

import CommentItem from "@/app/(main)/comment/_components/CommentItem";
import { COMMENT_HEADERS, COMMENT_PAGE_LIMIT, COMMENT_SELECT_ITEMS } from "@/app/(main)/comment/constant";
import TableContainer from "@/components/TableContainer";
import useCommentsQuery from "@/store/queries/comment/useCommentsQuery";
import { TComment } from "@/types/comment";

function CommentContainer() {
  const query = useCommentsQuery;

  return (
    <TableContainer<TComment>
      useQuery={query}
      renderRow={(comment: TComment) => <CommentItem key={comment.comment_id} comment={comment} />}
      headers={COMMENT_HEADERS}
      pageLimit={COMMENT_PAGE_LIMIT}
      searchOptions={COMMENT_SELECT_ITEMS}
    />
  );
}

export default CommentContainer;
