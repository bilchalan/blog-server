import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { User } from 'src/user/models/user.model';
import { Comment } from './models/comment.model';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentUser() currentUser: User,
  ): Promise<Comment> {
    return await this.commentService.create(createCommentDto, currentUser);
  }

  @Get('/:id')
  async findAll(@Param('id') id: string): Promise<Comment[]> {
    return await this.commentService.findAll(id);
  }

  @Get('/single/:commentId')
  async findOne(@Param('commentId') commentId: string): Promise<Comment> {
    return await this.commentService.findOne(commentId);
  }

  @Post('/replies')
  async createReply(
    @Body() createReplyDto: CreateReplyDto,
    @CurrentUser() currentUser: User,
  ) : Promise<Comment>{
    return await this.commentService.createReply(createReplyDto, currentUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
