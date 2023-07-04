import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";

export class PostApproveDto{
    @IsNotEmpty({message:'approve can not be empty.'})
    @IsBoolean({message:'approve should be boolean'})
    approve:boolean;

    @IsNotEmpty({message:'ids can not be empty.'})
    @IsArray({message:'ids should be in array format.'})
    ids:string[];
}