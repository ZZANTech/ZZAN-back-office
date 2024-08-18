"use client";

import { KNOWHOW_HEADERS, KNOWHOW_PAGE_LIMIT, POST_SELECT_ITEMS } from "@/app/(main)/knowhow/_constant";
import useKnowhowsQuery from "@/store/queries/knowhow/useKnowhowsQuery";
import TableContainer from "@/components/TableContainer";
import { TKnowhow } from "@/types/knowhow.type";
import KnowhowItem from "@/app/(main)/knowhow/_components/KnowhowItem";

function KnowhowContainer() {
  const query = useKnowhowsQuery;

  return (
    <TableContainer<TKnowhow>
      useQuery={query}
      renderRow={(knowhow: TKnowhow) => <KnowhowItem key={knowhow.knowhow_postId} knowhow={knowhow} />}
      headers={KNOWHOW_HEADERS}
      pageLimit={KNOWHOW_PAGE_LIMIT}
      searchOptions={POST_SELECT_ITEMS}
    />
  );
}

export default KnowhowContainer;
