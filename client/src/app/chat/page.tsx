import Messages from "@/components/Messages";
import Sidebar from "@/components/SideBar";
import React from "react";

function page() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        <Sidebar />
        <Messages />
      </div>
    </div>
  );
}

export default page;
