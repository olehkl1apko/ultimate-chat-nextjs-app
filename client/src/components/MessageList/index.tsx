"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { fetchMessages } from "@/lib";
import { useMessages, useSelectedUser, useUser } from "@/store/userStore";
import MessageItem from "./MessageItem";
import { socket } from "@/config";

function MessageList() {
  const sender = useUser((state: any) => state.myUser);
  const receiver = useSelectedUser((state: any) => state.selectedUser);
  const { messages, setMessages } = useMessages(
    (state: any) => ({
      messages: state.messages,
      setMessages: state.setMessages,
    }),
    shallow
  );

  const [parent] = useAutoAnimate();

  socket.on("refresh", () => {
    fetchMessages(sender, receiver, setMessages);
  });

  useEffect(() => {
    fetchMessages(sender, receiver, setMessages);
  }, [receiver, sender, setMessages]);

  return (
    <div
      ref={parent}
      className="w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar"
    >
      {messages
        ? messages.map((item: any, i: number) => (
            <MessageItem
              key={i}
              user={sender.email == item.sender ? true : false}
              message={item.message}
            />
          ))
        : ""}
    </div>
  );
}

export default MessageList;
