import { IsNotEmpty, IsString } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty({message:'tag tittle can not be empty.'})
    @IsString({message:'tag title should be string.'})
    title:string;
}
