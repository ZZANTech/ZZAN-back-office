"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/Input/CustomInput";
import Image from "next/image";
import useGiftMutation from "@/store/queries/gift/useGiftMutation";
import { TFormData, TGiftCategory } from "@/types/gift.type";
import { CATEGORIES } from "@/app/(main)/gift/constants";
import { Tables } from "@/types/supabase";
import {
  displayConfirmationDialog,
  displayErrorDialog,
  displaySuccessDialog,
  displayWarningDialog
} from "@/utils/sweetAlert";
import { useRouter } from "next/navigation";

type GiftFormProps = {
  previousGift?: Tables<"gifts">;
};

function GiftForm({ previousGift }: GiftFormProps) {
  const router = useRouter();
  const { addGift, updateGift } = useGiftMutation();

  const [formData, setFormData] = useState<TFormData>({
    gift_name: previousGift?.gift_name || "",
    point: previousGift?.point.toString() || "",
    category: (previousGift?.category as TGiftCategory) || "",
    brand_name: previousGift?.brand_name || "",
    img_file: null
  });

  const [imagePreview, setImagePreview] = useState<string | null>(previousGift?.img_url || null);

  useEffect(() => {
    if (previousGift) {
      setFormData({
        gift_name: previousGift.gift_name,
        point: previousGift.point.toString(),
        category: (previousGift.category as TGiftCategory) || "",
        brand_name: previousGift.brand_name,
        img_file: null
      });
      setImagePreview(previousGift.img_url);
    }
  }, [previousGift]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prevFormData) => ({ ...prevFormData, img_file: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "category" ? (value as TGiftCategory | "") : value
    }));
  };

  const handleCancel = async () => {
    const result = await displayConfirmationDialog("취소하시겠습니까?", "작성 중인 내용이 사라집니다.");

    if (result.isConfirmed) {
      router.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gift_name || !formData.point || !formData.category || !formData.brand_name) {
      displayWarningDialog("모든 필드를 채워주세요.", "필수 필드를 모두 입력해주세요.");
      return;
    }

    if (!formData.img_file && !previousGift?.img_url) {
      displayWarningDialog("이미지를 선택하세요.", "이미지를 업로드해주세요.");
      return;
    }

    const confirmText = previousGift ? "수정하시겠습니까?" : "추가하시겠습니까?";
    const confirmTitle = previousGift ? "상품 수정" : "상품 추가";

    const result = await displayConfirmationDialog(confirmTitle, confirmText);

    if (result.isConfirmed) {
      const newGift = {
        ...formData,
        point: Number(formData.point),
        img_url: formData.img_file ? URL.createObjectURL(formData.img_file) : previousGift?.img_url || "",
        ...(previousGift ? { giftId: previousGift.giftId } : {})
      };

      try {
        previousGift ? await updateGift(newGift) : await addGift(newGift);
        displaySuccessDialog(`${previousGift ? "수정" : "작성"}이 완료되었습니다`);
        router.replace("/gift");
      } catch (error) {
        displayErrorDialog("에러가 발생했습니다.", "다시 시도 해 주세요");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 text-white py-4 px-6">
          <h2 className="text-2xl font-bold">상품 등록</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <CustomInput value={formData.gift_name} onChange={handleChange} label="상품명" name="gift_name" required />
            <CustomInput
              value={formData.point}
              onChange={handleChange}
              label="포인트"
              name="point"
              type="number"
              required
            />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm">카테고리</label>
              <select
                value={formData.category}
                onChange={handleChange}
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">카테고리를 선택하세요</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <CustomInput
              value={formData.brand_name}
              onChange={handleChange}
              label="브랜드명"
              name="brand_name"
              required
            />
            <div className="mb-4">
              <label className="block text-gray-700">상품 이미지</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                  <span>Select Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {formData.img_file && <span className="ml-4">{formData.img_file.name}</span>}
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="rounded-md shadow-md object-cover"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button type="button" variant="outline" className="mr-2" onClick={handleCancel}>
                취소하기
              </Button>
              <Button type="submit" variant="default">
                저장하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GiftForm;
