import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({message:'title can not be empty.'})
    @IsString({message:'title should be string.'})
    title:string;

    @IsNotEmpty({message:'content can not be empty.'})
    @IsString({message:'content should be string.'})
    content:string;

    @IsNotEmpty({message:'excerpt can not be empty.'})
    @IsString({message:'excerpt should be string.'})
    @MaxLength(350,{message:'excerpt max length is 350 characters.'})
    excerpt:string;

    @IsNotEmpty({message:'images can not be empty.'})
    @IsArray({message:'feature images should be in array format.'})
    images:string[];

    @IsNotEmpty({message:'category can not be empty.'})
    @IsString({message:'category should be string.'})
    category:string;

    @IsArray({message:'tags should be in array format.'})
    tags:string[];

}
