import { ArticleEntity } from './../../article/entities/article.entity';
import { AddressEntity } from './address.entity';
import { ImageEntity } from './image.entity';
import { IsEmail } from 'class-validator';
import {
  Entity,
  Column,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CustomBaseEntity } from '../../common/base-entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @Column({ nullable: true })
  mobile: string;

  @JoinColumn()
  @OneToOne(() => ImageEntity, {
    eager: true,
    nullable: true,
  })
  image?: ImageEntity;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hashSync(password, this.password);
    return hash === this.password;
  }
  async compare(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}
