import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message:'category title can not be empty.'})
    @IsString({message:'category title should be string.'})
    title:string;

    @IsNotEmpty({message:'category description can not be empty.'})
    @IsString({message:'category description should be string.'})
    desc:string;
}
