import { createFetcher, type CustomRequestInit } from "./fetcher";

const { post, get } = createFetcher(
  "https://m1.apifoxmock.com/m1/6823977-6537947-default",
  {
    getHeaders() {
      const token = localStorage.getItem("token");
      const header: CustomRequestInit["headers"] = {
        Authorization: token ? `Bearer ${token}` : "",
      };
      return header;
    },
    headers: {
      apifoxToken: "v0jDZmA67HD_e2HL8dEH2",
    },
  },
);

export const login = (params: { userName: string; password: string }) =>
  post("/auth/login", params);

export const getUserInfo = () => get("/auth/getUserInfo");

export const getUserList = (params: object) => post("/user/list", params);
