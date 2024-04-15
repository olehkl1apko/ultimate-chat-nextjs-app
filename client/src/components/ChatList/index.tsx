"use client";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import { io } from "socket.io-client";

import { fetchUsers } from "@/lib";
import { useAllUsers } from "@/store/userStore";
import { userProps } from "@/types";
import ChatItem from "./ChatItem";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function ChatList({ mySelf }: { mySelf: userProps }) {
  const { users, setUsers } = useAllUsers(
    (state: any) => ({ users: state.users, setUsers: state.setUsers }),
    shallow
  );
  const socket = io(BACKEND_URL!);

  useEffect(() => {
    socket.on("new-user", () => {
      fetchUsers(mySelf, setUsers);
    });
  }, []);

  useEffect(() => {
    fetchUsers(mySelf, setUsers);
  }, []);

  return (
    <ul className="my-5 flex flex-col">
      {users ? (
        users
          ?.reverse()
          ?.map((user: any) => <ChatItem key={user._id} user={user} />)
      ) : (
        <span className="loading loading-ring w-16"></span>
      )}
    </ul>
  );
}

export default ChatList;
