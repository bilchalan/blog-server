import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:'Name can not be empty'})
    @IsString({message:'Name should be string'})
    name:string;

    @IsNotEmpty({message:'Email can not be empty'})
    @IsEmail({},{message:'Please provide a valid email.'})
    email:string;

    @IsNotEmpty({message:'Password can not be empty'})
    @MinLength(5,{message:'Password minimum length is 5'})
    password:string;

    @IsNotEmpty({message:'Avatar can not be empty'})
    @IsString({message:'Avatar should be string'})
    avatar:string;
}
