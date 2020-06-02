import { atom } from "recoil";

const AuthState = atom({
  key: "authState",
  default: {
    isLoggedIn: false,
    token: "",
    user: {
      name: "Ananta Bastola",
      channelName: "Hackerz",
    },
  },
});
