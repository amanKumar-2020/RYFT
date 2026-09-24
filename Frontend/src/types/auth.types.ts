export interface RegisterInput {
  fullName: string;
  email: string;
  contact?: string;
  password: string;
  role: "buyer" | "seller";
}

export interface LoginInput {
  email?: string;
  contact?: string;
  password: string;
}

export interface User {
  fullName: string;
  email: string;
  contact?: string;
  role: "buyer" | "seller";
}