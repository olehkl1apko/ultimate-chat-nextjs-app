"use client";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import { useSelectedUser, useUser } from "@/store/userStore";
import { PhoneIcon } from "@/utils/icons";
import { socket } from "@/config";

function CallBtn() {
  const router = useRouter();
  const [cookie] = useCookies(["user"]);
  const selectedUser = useSelectedUser((state) => state.selectedUser);
  const myUser = useUser((state) => state.myUser);

  function handleClick() {
    socket.emit(
      "private message",
      selectedUser.email,
      "📞" + myUser.name + " is calling " + selectedUser.name + "📞",
      cookie.user
    );
    router.push("/chat/room");
  }

  return (
    <button onClick={handleClick}>
      <PhoneIcon />
    </button>
  );
}

export default CallBtn;
