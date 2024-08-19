import { useState } from "react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import useVoteMutation from "@/store/queries/vote/useVoteMutation";
import { formatTime } from "@/utils/formatNumber";
import { TVote } from "@/types/vote.type";
import ToggleButton from "@/components/ToggleButton";

function VoteItem({ vote }: { vote: TVote }) {
  const { formattedDate } = formatTime(vote.created_at);

  const { updateVote } = useVoteMutation();
  const [isBanned, setIsBanned] = useState(vote.is_banned);

  const voteUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/votes/${vote.vote_postId}`;

  const handleToggleBan = async (newBanStatus: boolean) => {
    await updateVote({
      vote_postId: vote.vote_postId,
      is_banned: newBanStatus
    });
    setIsBanned(newBanStatus);
  };

  return (
    <TableRow className="text-center">
      <TableCell>{vote.vote_postId}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Link href={voteUrl} target="_blank" rel="noopener noreferrer">
          <span className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer">
            {vote.title}
          </span>
        </Link>
      </TableCell>
      <TableCell>{vote.users.nickname}</TableCell>
      <TableCell>
        <ToggleButton
          isActive={isBanned}
          onToggle={handleToggleBan}
          actionText={isBanned ? "재게시" : "게시 중지"}
          successMessage="게시 중지가 성공적으로 처리되었습니다."
          revertMessage="재게시가 성공적으로 처리되었습니다."
        />
      </TableCell>
    </TableRow>
  );
}

export default VoteItem;
