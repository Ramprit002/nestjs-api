import { UserType } from '../type/user.type';

export interface UserResponseInterface {
  user: UserType & { token: string };
}
