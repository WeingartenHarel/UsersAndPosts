import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    getPosts() {
        return this.postsService.getPosts();
    }

    @Get(':userId')
    getPostsByUserId(@Param('userId') userId: string) {
        return this.postsService.getPostsByUserId(+userId);
    }

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return this.postsService.createPost(createPostDto);
    }

    @Put(':postId')
    async updatePost(@Param('postId') postId: string, @Body() updatePostDto: CreatePostDto) {
        return this.postsService.updatePost(+postId, updatePostDto);
    }

    @Delete(':postId')
    async deletePost(@Param('postId') postId: string) {
        return this.postsService.deletePost(+postId);
    }
}