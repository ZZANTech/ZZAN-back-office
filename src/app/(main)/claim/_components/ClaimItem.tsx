import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useClaimMutation from "@/store/queries/claim/useClaimMutation";
import { TClaim } from "@/types/claim.type";
import { formatTime } from "@/utils/formatNumber";
import ToggleButton from "@/components/ToggleButton";

function ClaimItem({ claim }: { claim: TClaim }) {
  const { formattedDate, formattedTime } = formatTime(claim.created_at);
  const sentAtFormatted = claim.sent_at ? formatTime(claim.sent_at) : { formattedDate: "-", formattedTime: "-" };
  const { formattedDate: sentAtDate, formattedTime: sentAtTime } = sentAtFormatted;
  const { updateClaim } = useClaimMutation();
  const handleToggleClaim = async (newStatus: boolean) => {
    const { nickname, email, gift_name, ...rest } = claim;
    await updateClaim({
      ...rest,
      is_sent: newStatus
    });
  };
  return (
    <TableRow className="text-center">
      <TableCell>{claim.user_id}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{formattedTime}</TableCell>
      <TableCell>{claim.nickname}</TableCell>
      <TableCell>{claim.email}</TableCell>
      <TableCell>{claim.gift_name}</TableCell>
      <TableCell>{claim.is_sent ? "완료" : "대기중"}</TableCell>
      <TableCell>{sentAtDate}</TableCell>
      <TableCell>{sentAtTime}</TableCell>
      <TableCell>
        <ToggleButton
          type="claim"
          isActive={claim.is_sent}
          onToggle={handleToggleClaim}
          actionText={claim.is_sent ? "발송 취소" : "발송 완료"}
          successMessage={`발송 상태가 "완료" 로 변경되었습니다`}
          revertMessage={`발송 상태가 "대기중" 으로 변경되었습니다 `}
        />
      </TableCell>
    </TableRow>
  );
}

export default ClaimItem;
