import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://[::1]:3000",
});
