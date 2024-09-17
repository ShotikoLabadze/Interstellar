import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { S3Service } from 'src/aws/services/s3.service';

@Injectable()
export class FilesService {
    constructor(private readonly filesRepository:FilesRepository, private readonly s3Service: S3Service){}
   

    async  uploadFile(file: Express.Multer.File){

        const buffer = file.buffer
        const fileName = file.originalname.split('.').slice(0,-1).join('.')

        

        const result = await this.s3Service.upload(file, fileName)
        const savedFile = await this.filesRepository.save(
            fileName, 
            result.Location,
            result.Key,
            result.Bucket)

       return savedFile
    }
}
 