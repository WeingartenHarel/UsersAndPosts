import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [PostsController], // ApiController added
  providers: [PostsService], // ApiService added
  imports: [HttpModule], // imported axios/HttpModule
})
export class PostsModule {}