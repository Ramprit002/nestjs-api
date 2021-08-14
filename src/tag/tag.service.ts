import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TagEntity } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}
  async create(createTagDto: CreateTagDto): Promise<TagEntity> {
    const newTag = new TagEntity();
    Object.assign(newTag, createTagDto);
    return await this.tagRepository.save(newTag);
  }

  async findAll(query: any): Promise<TagEntity[]> {
    const queryBuilder = getRepository(TagEntity).createQueryBuilder('tags');

    if (query.name) {
      queryBuilder.andWhere('tags.name LIKE :name', {
        name: `%${query.name}%`,
      });
    }
    queryBuilder.orderBy('tags.createdAt', 'DESC');
    queryBuilder.andWhere('tags.isActive = true');
    const tags = await queryBuilder.getMany();

    return tags;
  }

  async findOne(id: string): Promise<TagEntity> {
    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new HttpException('tag does not exist', HttpStatus.NOT_FOUND);
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<TagEntity> {
    const tag = await this.findOne(id);
    if (!tag) {
      throw new HttpException('tag does not exist', HttpStatus.NOT_FOUND);
    }
    Object.assign(tag, updateTagDto);

    return await this.tagRepository.save(tag);
  }

  async remove(id: string): Promise<DeleteResult> {
    const deleteTag = await this.findOne(id);
    if (!deleteTag) {
      throw new HttpException('tag does not exist', HttpStatus.NOT_FOUND);
    }
    return await this.tagRepository.delete(deleteTag.id);
  }
}
