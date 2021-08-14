import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from 'src/common/base-entity';

@Entity({name:"user_image"})
export class ImageEntity extends CustomBaseEntity {
  @Column()
  url: string;

  @Column()
  key: string;
}
