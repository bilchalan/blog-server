import { Injectable,BadRequestException, UnauthorizedException,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { Model } from 'mongoose';
import {hash,compare} from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { sign } from 'jsonwebtoken';
import { UserDto } from './dto/user.dto';
import {ObjectId} from 'mongodb';
import { UpdateUserRolesDto } from './dto/update-role.dto';
import { UserRoles } from 'src/utility/user-roles';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}


  async create(createUserDto: CreateUserDto):Promise<UserDto> {
    const userExist=await this.userModel.findOne({email:createUserDto.email});
    if(userExist) throw new BadRequestException('User exists.');

    createUserDto.password=await hash(createUserDto.password,10);

    const user=await this.userModel.create(createUserDto);
    return user;
  }

  async signin(signInDto:SignInDto):Promise<UserDto>{
    const user=await this.userModel.findOne({email:signInDto.email})
    .select('+password').lean();
    if(!user) throw new UnauthorizedException('Bad credentials.')

    const passwordMatched:boolean=await compare(signInDto.password,user.password);
    if(!passwordMatched)  throw new UnauthorizedException('Bad credentials.')

    return user;
  }

  async generateToken(user:User):Promise<string>{
    return sign(
      {
        _id:user._id,email:user.email
      },
      process.env.TOKEN_SECRET,
      {expiresIn:process.env.TOKEN_EXPIRE_TIME}
    );
  }

  async findAll() :Promise<User[]>{
    return await this.userModel.find();
  }

  async findOne(id: ObjectId):Promise<User> {
    const user=await this.userModel.findById(id);
    if(!user) throw new NotFoundException('user not found.')
    return user;
  }

  async updateRoles(updateUserRolesDto:UpdateUserRolesDto):Promise<User>{
    const user=await this.userModel.findById(new ObjectId(updateUserRolesDto.id));
    if(!user) throw new NotFoundException('User not found.');
    user.roles=updateUserRolesDto.roles;
    return await user.save();
  }

  async getAuthors():Promise<User[]>{
    return await this.userModel.find({roles:UserRoles.Author}).select('_id name avatar')
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneForMiddleware(_id:ObjectId):Promise<User>{
    return await this.userModel.findById(_id);
  }
}
