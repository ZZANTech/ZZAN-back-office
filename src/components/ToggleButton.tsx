import { useState } from "react";
import { Button } from "@/components/ui/button";
import ModalDialog from "@/components/ModalDialog";

type ToggleButtonProps = {
  type?: "post" | "claim";
  isActive: boolean;
  onToggle: (newStatus: boolean) => Promise<void>;
  actionText: string;
  successMessage: string;
  revertMessage: string;
};

const ToggleButton = ({
  type = "post",
  isActive,
  onToggle,
  actionText,
  successMessage,
  revertMessage
}: ToggleButtonProps) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    setConfirmOpen(true);
  };

  const confirmCancel = () => {
    setConfirmOpen(false);
  };

  const handleToggle = async () => {
    setConfirmOpen(false);
    try {
      await onToggle(!isActive);
      setAlertMessage(!isActive ? successMessage : revertMessage);
      setAlertOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setAlertMessage(`오류 발생: ${error.message}`);
        setAlertOpen(true);
      }
    }
  };

  const getTitle = () => {
    if (type === "claim") {
      return isActive ? "기프티콘 발송 상태 초기화" : "기프티콘 발송 완료 처리";
    }
    return isActive ? "재게시 처리" : "게시 중지 처리";
  };

  const getMessage = () => {
    if (type === "claim") {
      return isActive ? `정말 발송 상태를 "대기중" 으로 되돌리시겠습니까?` : "정말 발송 완료 처리 하시겠습니까?";
    }
    return isActive ? "정말 재게시 처리 하시겠습니까?" : "정말 게시 중지 처리 하시겠습니까?";
  };

  return (
    <>
      <Button
        onClick={handleConfirm}
        variant={isActive ? "secondary" : `${type === "post" ? "destructive" : "default"}`}
      >
        {actionText}
      </Button>

      <ModalDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="알림"
        message={alertMessage}
        type="alert"
        onConfirm={() => setAlertOpen(false)}
      />
      <ModalDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={getTitle()}
        message={getMessage()}
        type="confirm"
        onConfirm={handleToggle}
        onCancel={confirmCancel}
      />
    </>
  );
};

export default ToggleButton;
