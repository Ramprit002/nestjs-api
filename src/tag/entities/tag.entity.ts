import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../common/base-entity';

@Entity({ name: 'tags' })
export class TagEntity extends CustomBaseEntity {
  @Column()
  name: string;
}
