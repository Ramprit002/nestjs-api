import { PartialType,  OmitType } from '@nestjs/mapped-types';

import { UserEntity } from '../entities/user.entity';

export class UserResponse extends PartialType(
  OmitType(UserEntity, ['id', 'email', 'username', 'is_email_verified'] as const),
) {}
