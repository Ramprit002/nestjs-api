import { ArticleEntity } from './../entities/article.entity';

export type ArticleType = Omit<
  ArticleEntity,
  | 'generateSlugify'
  | 'hasId'
  | 'save'
  | 'remove'
  | 'softRemove'
  | 'recover'
  | 'softRemove'
  | 'recover'
  | 'reload'
>;
