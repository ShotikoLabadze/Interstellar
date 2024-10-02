import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly s3Service: S3Service,
  ) {}

  // Helper function to generate a random file name
  private generateRandomFileName(): string {
    const randomString1 = Math.random().toString(36).substring(2, 8); // Random string of 6 characters
    const randomString2 = Math.random().toString(36).substring(2, 8); // Another random string
    return `file_${randomString1}_${randomString2}.mp3`; // Combine them with a base file name
  }

  async uploadFile(file: Express.Multer.File) {
    const buffer = file.buffer;

    // Generate a random file name using the helper function
    const randomFileName = this.generateRandomFileName();

    // Upload the file to S3 with a random file name
    const result = await this.s3Service.upload(file, randomFileName);

    // Save the file metadata in the database using the random file name
    const savedFile = await this.filesRepository.save(
      randomFileName,  // Random file name used
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
