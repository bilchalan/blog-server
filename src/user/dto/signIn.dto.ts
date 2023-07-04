import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class SignInDto{
    @IsNotEmpty({message:'Email can not be null.'})
    @IsEmail({},{message:'Please provide a valid email.'})
    email:string;

    @IsNotEmpty({message:'Password can not be null.'})
    @MinLength(5,{message:"Password should not be less than 5 characters."})
    password:string;
}