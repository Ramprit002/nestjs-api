import { CustomBaseEntity } from 'src/common/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity extends CustomBaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
