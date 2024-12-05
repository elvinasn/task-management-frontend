import { UserRole } from "../enums/user-role";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
}
export const getUserImage = (id?: string) => {
  return `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${id}`;
};
