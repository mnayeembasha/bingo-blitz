import { atom } from "recoil";
import { User } from "../../types";

// Retrieve user and token from localStorage safely
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

export const userAtom = atom<User | null>({
  key: "userAtom", // Unique key
  default: storedUser ? JSON.parse(storedUser) : null,
});

export const tokenAtom = atom<string | null>({
  key: "tokenAtom", // Unique key
  default: storedToken || null,
});

export const loaderAtom = atom<boolean>({
  key: "loaderAtom", // Unique key
  default: false,
});
