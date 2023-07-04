import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { Serialize } from 'src/utility/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';
import {ObjectId} from 'mongodb';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UpdateUserRolesDto } from './dto/update-role.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Serialize(UserDto)
  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto):Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Serialize(UserDto)
  @Post('/signin')
  async signin(@Body() signInDto:SignInDto,@Res({passthrough:true}) res:Response):Promise<UserDto>{
    const user= await this.userService.signin(signInDto);
    const token=await this.userService.generateToken(user);
    res.cookie('jwt',token,{
      httpOnly:true,
      maxAge:15*24*60*60*1000
    });
    return user;
  }

  @Post('/logout')
  logout(@Res({passthrough:true}) res:Response){
    res.clearCookie('jwt',{httpOnly:true})
    return {message:'Log Out.'};
  }

  @Get()
  @UseGuards(AuthenticationGuard,AuthorizeGuard([UserRoles.Admin]))
  async findAll():Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard,AuthorizeGuard([UserRoles.Admin]))
  async findOne(@Param('id') id: string):Promise<User> {
    return await this.userService.findOne(new ObjectId(id));
  }

  @Get('/me/profile')
  @UseGuards(AuthenticationGuard)
  async me(@CurrentUser() currentUser:User){
    return await this.userService.findOne(currentUser._id);
  }

  @Put('/roles/update')
  @UseGuards(AuthenticationGuard,AuthorizeGuard([UserRoles.Admin]))
  async updateRoles(@Body() updateUserRolesDto:UpdateUserRolesDto):Promise<User>{
    return await this.userService.updateRoles(updateUserRolesDto)
  }

  @Get('roles/authors')
  async getAuthors():Promise<User[]>{
    return await this. userService.getAuthors();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
