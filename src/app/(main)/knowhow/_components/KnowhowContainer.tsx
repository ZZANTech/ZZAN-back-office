"use client";

import { KNOWHOW_PAGE_LIMIT, POST_SELECT_ITEMS } from "@/app/(main)/knowhow/_constant";
import useKnowhowsQuery from "@/store/queries/knowhow/useKnowhowsQuery";
import TableContainer from "@/components/TableContainer";
import { TKnowhow } from "@/types/knowhow.type";
import KnowhowItem from "@/app/(main)/knowhow/_components/KnowhowItem";

const knowhowHeader = ["짠 노하우 아이디", "작성 일시", "제목", "작성자 닉네임", "게시글 규제"];

function KnowhowContainer() {
  const query = useKnowhowsQuery;

  return (
    <TableContainer<TKnowhow>
      useQuery={query}
      renderRow={(knowhow: TKnowhow) => <KnowhowItem key={knowhow.knowhow_postId} knowhow={knowhow} />}
      headers={knowhowHeader}
      pageLimit={KNOWHOW_PAGE_LIMIT}
      searchOptions={POST_SELECT_ITEMS}
    />
  );
}

export default KnowhowContainer;
