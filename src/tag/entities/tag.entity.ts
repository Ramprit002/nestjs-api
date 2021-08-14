import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../common/baseEntity';

@Entity({ name: 'tags' })
export class TagEntity extends CustomBaseEntity {
  @Column()
  name: string;
}
