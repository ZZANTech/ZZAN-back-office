import SidebarContainer from "@/app/(main)/_components/SidebarContainer";
import { ReactNode } from "react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] min-h-screen">
      <div className="w-64 h-screen  bg-gray-800">
        <SidebarContainer />
      </div>
      <main className="w-full h-full flex flex-col items-center ">{children}</main>
    </div>
  );
}

export default MainLayout;
