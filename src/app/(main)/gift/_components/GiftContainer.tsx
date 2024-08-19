"use client";

import GiftList from "@/app/(main)/gift/_components/GiftList";
import { buttonVariants } from "@/components/ui/button";
import useGiftsQuery from "@/store/queries/gift/useGiftsQuery";
import Link from "next/link";
import clsx from "clsx";

function GiftContainer() {
  const { data: gifts } = useGiftsQuery();
  return (
    <div className="relative">
      {gifts && <GiftList gifts={gifts} />}
      <Link
        href="/gift/write"
        className={clsx(
          buttonVariants({ variant: "default", size: "icon" }),
          "fixed bottom-10 right-10 w-14 h-14 flex items-center justify-center !text-2xl !rounded-full"
        )}
      >
        +
      </Link>
    </div>
  );
}

export default GiftContainer;
