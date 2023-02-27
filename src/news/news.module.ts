import { forwardRef, Module } from '@nestjs/common';
import {
  NewsCategoryService,
  NewsService,
  RecommendationDataService,
  UserInterestsService,
  UserLikesNewsService,
} from './news.service';
import {
  NewsCategoryResolver,
  NewsResolver,
  RecommendationDataResolver,
  UserInterestsResolver,
  UserLikesNewsResolver,
} from './news.resolver';
import { Upload } from 'src/common/scalars/upload.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  News,
  NewsCategory,
  NewsImage,
  UserInterests,
  UserLikesNews,
  UserNewsEngagement,
} from './entities/news.entity';
import {Profile as userProfile} from 'src/users/entitiy/users.entity';
import { TagsModule } from 'src/tags/tags.module';
import { FilesService } from 'src/common/services/files.service';
import { NewsComment } from 'src/comments/entities/comment.entity';
import{Tag} from 'src/tags/entities/tag.entity'

@Module({
  providers: [
    NewsResolver,
    NewsService,
    Upload,
    NewsCategoryResolver,
    NewsCategoryService,
    UserLikesNewsResolver,
    UserLikesNewsService,
    FilesService,
    UserInterestsResolver,
    UserInterestsService,
    RecommendationDataResolver,
    RecommendationDataService,
  ],
  imports: [
    forwardRef(() => TagsModule),
    TypeOrmModule.forFeature([
      News,
      NewsImage,
      NewsCategory,
      UserLikesNews,
      UserNewsEngagement,
      UserInterests,
      userProfile,
      NewsComment,
      Tag
    ]),
  ],
  exports: [NewsService],
})
export class NewsModule {}
