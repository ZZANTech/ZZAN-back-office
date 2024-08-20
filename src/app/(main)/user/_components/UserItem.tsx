import { TUser } from "@/types/user.type";
import { TableCell, TableRow } from "@/components/ui/table";
import DropdownMenu from "@/components/DropdownMenu";
import { displayConfirmationDialog } from "@/utils/sweetAlert";
import useUserMutation from "@/store/queries/user/useUserMutation";
import clsx from "clsx";
import { displayAddPointsDialog } from "@/utils/sweetAlert";
import { useEffect, useState } from "react";

type UserItemProps = {
  user: TUser;
};

function UserItem({ user }: UserItemProps) {
  const { updateUserStatus, updateUserPoint } = useUserMutation();
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const handleAddPoint = async () => {
    const formValues = await displayAddPointsDialog(user.nickname);
    if (formValues) {
      const { points, reason } = formValues;
      const pointsNumber = parseInt(points, 10);
      const nickname = user.nickname;

      const confirmationMessage =
        pointsNumber >= 0
          ? `정말 ${nickname} 님에게 ${points} 포인트를 추가하시겠습니까?`
          : `정말 ${nickname} 님의 포인트를 ${Math.abs(pointsNumber)} 만큼 차감하시겠습니까?`;

      const { isConfirmed } = await displayConfirmationDialog("포인트 변경 확인", confirmationMessage);

      if (isConfirmed) {
        updateUserPoint({ userId: user.userId, points, reason });
      }
    }
  };

  const handleUserAction = async () => {
    const action = isBlocked ? "unblock" : "block";
    const actionConfirmation = isBlocked
      ? {
          title: "정말 제한을 해제하시겠습니까?",
          message: `${user.nickname} 의 사용자 권한이 복원됩니다`
        }
      : {
          title: `해당 유저를 제한하시겠습니까?`,
          message: `${user.nickname} (은)는 로그인이 불가능하게 됩니다`
        };

    const { isConfirmed } = await displayConfirmationDialog(actionConfirmation.title, actionConfirmation.message);

    if (isConfirmed) {
      const updatedStatus = await updateUserStatus({ userId: user.userId, action });
      setIsBlocked(updatedStatus);
    }
  };

  const menuItems = [
    { label: "포인트 추가", onClick: handleAddPoint },
    {
      label: isBlocked ? "제한 해제" : "사용 제한",
      onClick: handleUserAction
    }
  ];

  useEffect(() => {
    setIsBlocked(user.is_blocked);
  }, [user.is_blocked]);

  return (
    <TableRow
      className={clsx("text-center", {
        "bg-red-100 hover:bg-red-300": isBlocked
      })}
    >
      <TableCell>{user.userId}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.nickname}</TableCell>
      <TableCell>{user.provider}</TableCell>
      <TableCell>{user.total_point}</TableCell>
      <TableCell>{user.current_point}</TableCell>
      <TableCell> - </TableCell>
      <TableCell>
        <DropdownMenu buttonLabel="메뉴" items={menuItems} />
      </TableCell>
    </TableRow>
  );
}

export default UserItem;
