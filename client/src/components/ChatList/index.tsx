"use client";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { fetchUsers } from "@/lib";
import { useAllUsers } from "@/store/userStore";
import { userProps } from "@/types";
import ChatItem from "./ChatItem";
import { socket } from "@/config";

function ChatList({ mySelf }: { mySelf: userProps }) {
  const { users, setUsers } = useAllUsers(
    (state: any) => ({ users: state.users, setUsers: state.setUsers }),
    shallow
  );

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
