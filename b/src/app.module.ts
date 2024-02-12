import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from './users/users.module';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/post.entity'; // Import your PostEntity here
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5050,
      username: 'postgres',
      password: 'admin',
      database: 'Posts',
      entities: [Post, User],
      synchronize: true, // In development, set to false in production
    }),
    TypeOrmModule.forFeature([Post , User]), // Ensure this line is present
    HttpModule, UsersModule], // imported axios/HttpModule
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, UsersService, PostsService],

})
export class AppModule { }
