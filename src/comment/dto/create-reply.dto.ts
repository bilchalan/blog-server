import { IsNotEmpty, IsString } from "class-validator";

export class CreateReplyDto{
    @IsNotEmpty({message:"Comment id should not be empty."})
    @IsString({message:"Comment Id should be string."})
    commentId:string;

    @IsNotEmpty({message:"Reply text should not be empty."})
    @IsString({message:"Reply text should be string."})
    replyText:string;
}