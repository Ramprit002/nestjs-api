import { UserEntity } from './user.entity';
import { CustomBaseEntity } from 'src/common/base-entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity({name:"address"})
export class AddressEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  address_line_1: string;

  @Column({ nullable: true })
  address_line_2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  zip_code: string;

  @Column({ default: false })
  is_default: boolean;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: UserEntity;
}
