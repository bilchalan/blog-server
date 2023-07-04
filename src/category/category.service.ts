import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './models/category.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {ObjectId} from 'mongodb';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel:Model<CategoryDocument>){}

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    const category=await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async findAll():Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async findOne(id: ObjectId):Promise<Category> {
    const category=await this.categoryModel.findById(id);
    if(!category) throw new NotFoundException('category not found.')
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
