import ClaimItem from "@/app/(main)/claim/_components/ClaimItem";
import TableHeaderCell from "@/app/(main)/claim/_components/TableHeaderCell";
import { TClaim } from "@/types/claim";

type ClaimListProps = {
  claims: TClaim[];
};

// const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
//   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">{children}</th>
// );

function ClaimList({ claims }: ClaimListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeaderCell>신청 날짜</TableHeaderCell>
            <TableHeaderCell>신청 시간</TableHeaderCell>
            <TableHeaderCell>닉네임</TableHeaderCell>
            <TableHeaderCell>이메일</TableHeaderCell>
            <TableHeaderCell>상품명</TableHeaderCell>
            <TableHeaderCell>발송 상태</TableHeaderCell>
            <TableHeaderCell>발송 날짜</TableHeaderCell>
            <TableHeaderCell>발송 시간</TableHeaderCell>
            <TableHeaderCell>발송 상태 변경</TableHeaderCell>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {claims.map((claim) => (
            <ClaimItem key={claim.gift_claimId} claim={claim} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClaimList;
