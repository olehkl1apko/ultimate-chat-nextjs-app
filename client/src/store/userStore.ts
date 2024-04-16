import { createWithEqualityFn } from "zustand/traditional";

import { selectedUserState, userState } from "@/types";

export const useUser = createWithEqualityFn<userState>((set) => ({
  myUser: undefined,
  setUser: (user) => set({ myUser: user }),
}));

export const useAllUsers = createWithEqualityFn((set) => ({
  users: undefined,
  setUsers: (users: any) => set({ users }),
}));

export const useSelectedUser = createWithEqualityFn<selectedUserState>(
  (set) => ({
    selectedUser: undefined,
    setSelectedUser: (user) => set({ selectedUser: user }),
  })
);

export const useMessages = createWithEqualityFn((set) => ({
  message: undefined,
  setMessages: (messages: any) => set({ messages }),
}));
