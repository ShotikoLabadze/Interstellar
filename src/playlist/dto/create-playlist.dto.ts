import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class CreatePlaylistDto {

    @IsString()
    name: string;
    
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    musicIds: number[];


   
}
