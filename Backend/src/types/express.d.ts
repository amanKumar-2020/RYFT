import type User from "../models/user.model";

declare global {
  namespace Express {
    interface User extends InstanceType<typeof User> {}
  }
}

export {};
