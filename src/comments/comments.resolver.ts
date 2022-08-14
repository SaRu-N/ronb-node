import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NewsCommentsService, NewsRepliesService } from './comments.service';
import { NewsComment, NewsReply } from './entities/comment.entity';
import {
  CreateNewsCommentInput,
  CreateNewsReplyInput,
} from './dto/create-comment.input';
import {
  UpdateNewsCommentInput,
  UpdateNewsReplyInput,
} from './dto/update-comment.input';
import { User } from 'src/common/decorators/user.decorator';
import { checkUserAuthenticated } from 'src/common/utils/checkUserAuthentication';

@Resolver(() => NewsComment)
export class NewsCommentsResolver {
  constructor(private readonly newsCommentsService: NewsCommentsService) {}

  @Mutation(() => NewsComment)
  createNewsComment(
    @Args('createNewsCommentInput')
    createNewsCommentInput: CreateNewsCommentInput,
    @User() user: number,
  ) {
    console.log(createNewsCommentInput);
    checkUserAuthenticated(user);
    return this.newsCommentsService.create(createNewsCommentInput, user);
  }

  @Query(() => [NewsComment], { name: 'newsComments' })
  findAll(@Args('newsId', { type: () => Int }) newsId: number) {
    return this.newsCommentsService.findAll(newsId);
  }

  @Query(() => NewsComment, { name: 'newsComment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsCommentsService.findOne(id);
  }

  @Mutation(() => NewsComment)
  updateNewsComment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateNewsCommentInput')
    updateNewsCommentInput: UpdateNewsCommentInput,
    @User() user: number,
  ) {
    checkUserAuthenticated(user);
    return this.newsCommentsService.update(id, updateNewsCommentInput, user);
  }

  @Mutation(() => NewsComment)
  removeNewsComment(
    @Args('id', { type: () => Int }) id: number,
    @User() user: number,
  ) {
    checkUserAuthenticated(user);
    return this.newsCommentsService.remove(id, user);
  }

  @ResolveField(() => Int)
  replyCount(@Parent() newsComment: NewsComment) {
    const commentId = newsComment.id;
    return this.newsCommentsService.countReplies(commentId);
  }
}

@Resolver(() => NewsReply)
export class NewsRepliesResolver {
  constructor(private readonly newsReplyService: NewsRepliesService) {}

  @Mutation(() => NewsReply)
  createNewsReply(
    @Args('createNewsReplyInput')
    createNewsReplyInput: CreateNewsReplyInput,
    @User() user: number,
  ) {
    checkUserAuthenticated(user);
    return this.newsReplyService.create(createNewsReplyInput, user);
  }

  @Query(() => [NewsReply], { name: 'newsReplies' })
  findAll(@Args('newsCommentId', { type: () => Int }) newsCommentId: number) {
    return this.newsReplyService.findAll(newsCommentId);
  }

  @Mutation(() => NewsReply)
  updateNewsReply(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateNewsReplyInput')
    updateNewsReplyInput: UpdateNewsReplyInput,
    @User() user: number,
  ) {
    checkUserAuthenticated(user);
    return this.newsReplyService.update(id, updateNewsReplyInput, user);
  }

  @Mutation(() => NewsReply)
  removeNewsReply(
    @Args('id', { type: () => Int }) id: number,
    @User() user: number,
  ) {
    checkUserAuthenticated(user);
    return this.newsReplyService.remove(id, user);
  }
}
