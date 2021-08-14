import { ConfigService } from '@nestjs/config';
import { ImageEntity } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';


@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
    private readonly configService: ConfigService,
  ) {}

  async uploadImage(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuidv4()}-${filename}`,
      })
      .promise();

    const newFile = this.imageRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.imageRepository.save(newFile);
    return newFile;
  }
}
