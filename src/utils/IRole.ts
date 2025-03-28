import { Role } from "../utils/role";

export interface IUser {
  userId: string;
  name: string;
  email: string;
  password: string;
  role?: Role;
}
