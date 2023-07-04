import { ArrayMaxSize, IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRoles } from "src/utility/user-roles";

export class UpdateUserRolesDto{
    @IsNotEmpty({message:'User id can not be null.'})
    @IsString({message:'Id should be string.'})
    id:string;

    @IsNotEmpty({message:'Roles can not be null.'})
    @IsEnum(UserRoles,{each:true,message:'Provided roles may be inaccurate.'})
    @IsArray({message:'Roles formate is array.'})
    @ArrayMaxSize(3, {message:'Please, maximum three roles'})
    roles:string[];
}