import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    const buffer = file.buffer;
    
    // Use a static file name for all uploads, e.g., "file.mp3"
    const staticFileName = 'file.mp3';

    // Upload the file to S3 with a fixed file name
    const result = await this.s3Service.upload(file, staticFileName);

    // Save the file metadata in the database using the static file name
    const savedFile = await this.filesRepository.save(
      staticFileName,  // Static file name used
      result.Location,
      result.Key,
      result.Bucket,
    );

    return savedFile;
  }

  async getFile(fileId: number) {
    const file = await this.filesRepository.findOne(fileId);
    return file;
  }

  async findAll() {
    return await this.filesRepository.findAll();
  }
}
