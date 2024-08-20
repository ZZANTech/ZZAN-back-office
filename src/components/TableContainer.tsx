"use client";

import { UseQueryResult } from "@tanstack/react-query";
import React, { useState } from "react";
import PaginationContainer from "@/components/PaginationContainer";
import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";
import SearchBar from "@/components/SearchBar";
import LoadingSpinner from "@/components/LoadingSpinner";

type TableContainerProps<T> = {
  useQuery: (
    page: number,
    limit: number,
    selectedSearchOption?: string,
    searchKeyword?: string
  ) => UseQueryResult<{ data: T[]; totalPages: number }, Error>;
  renderRow: (item: T) => React.ReactElement;
  headers: string[];
  pageLimit: number;
  searchOptions?: { value: string; label: string }[];
};

function TableContainer<T>({ useQuery, renderRow, headers, pageLimit, searchOptions }: TableContainerProps<T>) {
  const [page, setPage] = useState<number>(1);
  const [selectedSearchOption, setSelectedSearchOption] = useState<string>(
    searchOptions ? searchOptions[0]?.value || "" : ""
  );
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [searchParams, setSearchParams] = useState<{ option: string; keyword: string }>({
    option: selectedSearchOption,
    keyword: searchKeyword
  });

  const { data = { data: [], totalPages: 1 }, isPending } = useQuery(
    page,
    pageLimit,
    searchParams.option,
    searchParams.keyword
  );

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSearchOptionChange = (value: string) => {
    setSelectedSearchOption(value);
  };

  const handleSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ option: selectedSearchOption, keyword: searchKeyword });
    setPage(1);
  };

  return (
    <article className="w-full h-full p-10 m-auto">
      {searchOptions && (
        <SearchBar
          selectedSearchOption={selectedSearchOption}
          searchKeyword={searchKeyword}
          onSearchOptionChange={handleSearchOptionChange}
          onSearchKeywordChange={handleSearchKeywordChange}
          onSearch={handleSearch}
          selectItems={searchOptions}
        />
      )}
      {isPending ? (
        <div className="flex items-center justify-center h-full">
          <LoadingSpinner color="text-gray-500" />
        </div>
      ) : data.data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">결과가 없습니다.</p>
        </div>
      ) : (
        <div className="overflow-x-auto min-h-[1135px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header) => (
                  <TableHeaderCell key={header}>{header}</TableHeaderCell>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.data.map((item, index) => React.cloneElement(renderRow(item), { key: index }))}
            </tbody>
          </table>
        </div>
      )}
      {data.totalPages > 1 && (
        <PaginationContainer currentPage={page} onPageChange={handlePageChange} totalPages={data.totalPages} />
      )}
    </article>
  );
}

export default TableContainer;
