import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './models/tag.model';
import { AuthorizeGuard } from 'src/utility/guards/authorize.guard';
import { UserRoles } from 'src/utility/user-roles';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import {ObjectId} from 'mongodb';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AuthenticationGuard,(AuthorizeGuard([UserRoles.Admin,UserRoles.Author])))
  async create(@Body() createTagDto: CreateTagDto):Promise<Tag> {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  async findAll():Promise<Tag[]> {
    return await this.tagService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<Tag> {
    return await this.tagService.findOne(new ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
