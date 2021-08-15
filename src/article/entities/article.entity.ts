import { UserEntity } from './../../user/entities/user.entity';
import { CustomBaseEntity } from 'src/common/base-entity';
import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import slugify from 'slugify';

@Entity({ name: 'articles' })
export class ArticleEntity extends CustomBaseEntity {
  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column('simple-array')
  tagList: string[];

  @Column({ default: 0 })
  favoritesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlugify() {
    this.slug = slugify(this.title);
  }
}
