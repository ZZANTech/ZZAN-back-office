import { TableCell, TableRow } from "@/components/ui/table";
import { TComment } from "@/types/comment";
import CommentTooltip from "@/app/(main)/comment/_components/CommentTooltip";
import Link from "next/link";
import { ZZAN_BASE_URL } from "@/constants";
import { formatTime } from "@/utils/formatNumber";
import useCommentMutation from "@/store/queries/comment/useCommentMutation";
import ToggleButton from "@/components/ToggleButton";

function CommentItem({ comment }: { comment: TComment }) {
  const { updateCommentStatus } = useCommentMutation();
  const { formattedDate, formattedTime } = formatTime(comment.created_at);
  const isKnowhow = comment.type === "knowhow";
  const postURL = `${ZZAN_BASE_URL}/boards/${isKnowhow ? "knowhow" : "votes"}/${comment.post_id}`;

  const handleToggleBan = async (newBanStatus: boolean) => {
    await updateCommentStatus({
      comment_id: comment.comment_id,
      type: comment.type,
      is_banned: newBanStatus
    });
  };

  return (
    <TableRow className="text-center">
      <TableCell>{comment.comment_id}</TableCell>
      <TableCell>
        <Link
          href={postURL}
          className="underline text-blue-600 hover:text-blue-800 transition-colors duration-300 cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          {comment.post_id}
        </Link>
      </TableCell>
      <TableCell>{comment.type}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{formattedTime}</TableCell>
      <TableCell>{comment.nickname}</TableCell>
      <TableCell className="truncate max-w-3xl">
        <CommentTooltip content={comment.content}>
          <div className="truncate cursor-pointer">{comment.content}</div>
        </CommentTooltip>
      </TableCell>
      <TableCell>{comment.is_banned ? "중지됨" : "게시됨"}</TableCell>
      <TableCell>
        <ToggleButton
          isActive={comment.is_banned}
          onToggle={handleToggleBan}
          actionText={comment.is_banned ? "재게시" : "게시 중지"}
          successMessage="게시 중지가 성공적으로 처리되었습니다."
          revertMessage="재게시가 성공적으로 처리되었습니다."
        />
      </TableCell>
    </TableRow>
  );
}

export default CommentItem;
