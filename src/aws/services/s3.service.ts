import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { MimeType } from "aws-sdk/clients/kendra";


import * as dotenv  from 'dotenv';

dotenv.config({path: '.env'})
@Injectable()
export class S3Service {
    private s3Client: AWS.S3;
    constructor(){
        this.s3Client = new AWS.S3({
            accessKeyId: process.env.AWS_ACCES_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            signatureVersion: 'v4'
        })
    }

  async  upload(file: Express.Multer.File, key: string){
    const buffer = file.buffer
    const fileKey = key
    
        const params = {
            Bucket: 'miulai-bucket',
            Key: fileKey,
            Body: buffer,
            ContentType: file.mimetype,
            ContentDisposition: 'inline',
            CreateBucketConfiguration: { 
                LocationConstraint: 'eu-north-1',
            },
        };

        try {
            return await this.s3Client.upload(params).promise();
        }   catch(e) {
            throw e
        }
    }

    async getPresignedUrl(key: string): Promise<string>{
        const params = {
            Bucket: 'miulai-bucket',
            Key: key,
        };
        try {
            const url = await this.s3Client.getSignedUrlPromise('getObject', params);
            return url;
        } catch (error){
            console.log(
                `Failed to get presigned URL for key ${key}`,
                error.stack,
            )
        }
    } 

}