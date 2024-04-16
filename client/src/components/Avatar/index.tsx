"use client";

import Image from "next/image";
import React from "react";

import { AvatarProps } from "@/types";
import defaultAvatar from "../../assets/defaultAvatar.png";

function Avatar({ avatarId, setAvatarId }: AvatarProps) {
  const randomAvatar = `https://robohash.org/${avatarId}.png`;

  return (
    <div
      onClick={() => setAvatarId((Math.random() * 20).toFixed())}
      className="avatar cursor-pointer mx-auto mb-5 tooltip"
      data-tip="Click to regenerate avatar"
    >
      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        {randomAvatar && (
          <Image
            src={randomAvatar}
            width={256}
            height={256}
            alt="avatar"
            priority
          />
        )}
      </div>
    </div>
  );
}

export default Avatar;
