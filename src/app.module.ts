import { Module,MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {config} from 'dotenv';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';
config();

@Module({
  imports: [MongooseModule.forRoot(process.env.DB_URI), UserModule, PostModule, CategoryModule, TagModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes({
      path:'*',
      method:RequestMethod.ALL
    })
  }
}
