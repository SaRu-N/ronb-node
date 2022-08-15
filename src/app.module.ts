import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityMiddleware } from './common/middlewares/security.middleware';
import { NewsModule } from './news/news.module';
import { PublicToiletModule } from './public-toilet/public-toilet.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,// Makes the variable global
      // i.e no need to import in each module
    }),
    NewsModule,
    PublicToiletModule,
    TagsModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      path: process.env.GQL_PATH || '/graphql',
      // uploads: {
      //   maxFileSize: 10000000, // 10 MB
      //   maxFiles: 5,
      // },
      uploads: false,
      cors: {
        origin: function (origin, callback) {
          if (!origin || process.env.CORS_WHITELIST.split(',').indexOf(origin) !== -1) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        },
        credentials: true,
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNC === 'true',
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.MEDIA_ROOT || 'uploads'),
      serveRoot: `/${process.env.MEDIA_ROOT || 'uploads'}`,
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(SecurityMiddleware).forRoutes('*');
  // }
}
