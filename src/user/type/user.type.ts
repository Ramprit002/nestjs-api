import { UserEntity } from './../entities/user.entity';

export type UserType = Omit<
  UserEntity,
  | 'hashPassword'
  | 'validatePassword'
  | 'hasId'
  | 'save'
  | 'remove'
  | 'softRemove'
  | 'recover'
  | 'reload'
  |'compare'
>;
