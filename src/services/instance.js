import axios from "axios";

const API = process.env.REACT_APP_API;

export const instance = axios.create({
    baseURL: API,
    headers: {
      "Content-Type": "application/json",
    },
  });