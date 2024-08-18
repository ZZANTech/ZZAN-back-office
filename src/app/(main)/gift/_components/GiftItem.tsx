"use client";
import useGiftMutation from "@/store/queries/gift/useGiftMutation";
import { Tables } from "@/types/supabase";
import { displayConfirmationDialogWithInput, displayErrorDialog, displaySuccessDialog } from "@/utils/sweetAlert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import kebab from "/public/icons/kebab.svg";
import DropdownMenu from "@/components/DropdownMenu";

function GiftItem({ gift }: { gift: Tables<"gifts"> }) {
  const { removeGift } = useGiftMutation();
  const router = useRouter();

  const handleGiftDelete = async () => {
    const result = await displayConfirmationDialogWithInput(
      "삭제하시겠습니까?",
      `삭제할 상품명을 입력해주세요\n"${gift.gift_name}"`,
      "삭제할 상품명을 입력해주세요",
      gift.gift_name
    );

    if (result.isConfirmed) {
      try {
        await removeGift(gift.giftId);
        displaySuccessDialog("삭제되었습니다");
      } catch (error) {
        displayErrorDialog("에러가 발생했습니다.", "다시 시도 해 주세요");
      }
    }
  };

  const menuItems = [
    {
      label: "Edit",
      onClick: () => router.push(`/gift/edit/${gift.giftId}`)
    },
    {
      label: "Delete",
      onClick: handleGiftDelete
    }
  ];

  return (
    <li className="flex justify-center mb-6">
      <div className="w-full h-full max-w-md rounded overflow-hidden shadow-lg bg-white">
        <div className="relative">
          <Image
            src={gift.img_url}
            alt={gift.gift_name}
            width={400}
            height={200}
            className="object-cover w-full h-48"
          />
          <div className="absolute top-2 right-2">
            <DropdownMenu
              buttonLabel={<Image src={kebab} alt="kebab_menu" width={24} height={24} />}
              items={menuItems}
            />
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-sm mb-2">{gift.gift_name}</div>
          <p className="text-gray-700 text-base">{gift.brand_name}</p>
          <p className="text-gray-700 text-base">{gift.category}</p>
        </div>
      </div>
    </li>
  );
}

export default GiftItem;
