import { useState } from "react";
import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import useKnowhowMutation from "@/store/queries/knowhow/useKnowhowMutation";
import { formatTime } from "@/utils/formatNumber";
import { TKnowhow } from "@/types/knowhow.type";
import ToggleButton from "@/components/ToggleButton";

function KnowhowItem({ knowhow }: { knowhow: TKnowhow }) {
  const { formattedDate } = formatTime(knowhow.created_at);

  const { updateKnowhow } = useKnowhowMutation();
  const [isBanned, setIsBanned] = useState(knowhow.is_banned);

  const knowhowUrl = `${process.env.NEXT_PUBLIC_ZZAN_BASE_URL}/boards/knowhow/${knowhow.knowhow_postId}`;

  const handleToggleBan = async (newBanStatus: boolean) => {
    await updateKnowhow({
      knowhow_postId: knowhow.knowhow_postId,
      is_banned: newBanStatus
    });
    setIsBanned(newBanStatus);
  };
  return (
    <TableRow className="text-center">
      <TableCell>{knowhow.knowhow_postId}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <Link href={knowhowUrl} target="_blank" rel="noopener noreferrer">
          <span className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer">
            {knowhow.title}
          </span>
        </Link>
      </TableCell>
      <TableCell>{knowhow.users.nickname}</TableCell>
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

export default KnowhowItem;
