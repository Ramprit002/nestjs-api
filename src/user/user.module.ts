import { ConfigService } from '@nestjs/config';
import { ImageEntity } from './entities/image.entity';
import { ImageService } from './image.service';
import { AuthGuard } from './auth.guard';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './auth.middleware';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ImageEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    AuthMiddleware,
    AuthGuard,
    ImageService,
    ConfigService,
  ],
  exports: [UserService, ImageService],
})
export class UserModule {}
