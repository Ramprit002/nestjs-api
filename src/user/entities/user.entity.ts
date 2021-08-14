import { IsEmail } from 'class-validator';
import { Entity, Column, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CustomBaseEntity } from '../../common/baseEntity';

@Entity({ name: 'users' })
@Unique(['email', 'username', 'mobile'])
export class UserEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  mobile: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hashSync(password, this.password);
    return hash === this.password;
  }
}
