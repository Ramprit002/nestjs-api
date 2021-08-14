import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CONSTANT } from '../common/error-constant';
import { UserResponseInterface } from './interface/user-response.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = new UserEntity();
      const hashPassword = await hash(createUserDto.password, 10);
      Object.assign(newUser, {
        ...createUserDto,
        password: hashPassword,
        isActive: false,
      });
      await this.userRepository.save(newUser);
      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error?.code === CONSTANT.POSTGRES_UNIQUE) {
        throw new HttpException(CONSTANT.USER_EXISTS, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        CONSTANT.SOMETHING_WRONG,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        email: loginUserDto.email,
      },
      {
        select: [
          'id',
          'email',
          'password',
          'createdAt',
          'updatedAt',
          'isActive',
        ],
      },
    );

    if (!user) {
      throw new HttpException(
        CONSTANT.USER_EMAIL_OR_PASS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordCorrect = compare(loginUserDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(
        CONSTANT.USER_EMAIL_OR_PASS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    delete user.password;
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string): Promise<UserEntity> {
    const user = this.userRepository.findOne(id);
    if (user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateJwt(user: UserEntity): string {
    return jwt.sign({ user_id: user.id }, process.env.JWT_SECRET || 'random');
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
