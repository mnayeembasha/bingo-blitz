import {atom} from "recoil";
import { User } from "../../types";

export const userAtom = atom<User>({
    key:'User'
})

export const tokenAtom = atom<string>({
    key:'Token'
})

export const loaderAtom = atom<boolean>({
    key:"Loading"
})