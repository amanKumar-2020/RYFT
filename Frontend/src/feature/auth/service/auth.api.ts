import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export interface RegisterSchema {
  fullName: string;
  email: string;
  contact?: string;
  password?: string;
  role: "buyer" | "seller";
}
export async function register({
  email,
  fullName,
  contact,
  password,
  role,
}: RegisterSchema) {
  const response = await authApiInstance.post("/register", {
    email,
    fullName,
    contact,
    password,
    role,
  });
  return response.data;
}

export interface LoginSchema {
  email?: string;
  password: string;
  contact?: string;
}
export async function login({ email, password, contact }: LoginSchema) {
  const response = await authApiInstance.post("/login", {
    email,
    password,
    contact,
  });
  return response.data;
}

export async function getMe() {
  const response = await authApiInstance.get("/me");
  return response.data;
}
