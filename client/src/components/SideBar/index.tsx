"use client";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { shallow } from "zustand/shallow";

import { fetchUser } from "@/lib";
import { useUser } from "@/store/userStore";
import SearchBar from "../SearchBar";
import ChatList from "../ChatList";

function Sidebar() {
  const [cookie, setCookie] = useCookies(["user"]);
  const { myUser, setUser } = useUser(
    (state) => ({ myUser: state.myUser, setUser: state.setUser }),
    shallow
  );

  useEffect(() => {
    fetchUser(cookie, setUser);
  }, [cookie, cookie.user, setUser]);

  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400  md:w-1/2 lg:w-1/3 p-3 bg-white h-screen">
      <SearchBar user={myUser} />
      {myUser && <ChatList mySelf={myUser} />}
    </div>
  );
}

export default Sidebar;
