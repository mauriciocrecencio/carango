import axios from "axios";

const baseURL = "http://localhost:3333";

export const API = axios.create({
  baseURL,
});

export const APIAuth = axios.create({
  baseURL: "https://auth-user-jwt.herokuapp.com/",
});
