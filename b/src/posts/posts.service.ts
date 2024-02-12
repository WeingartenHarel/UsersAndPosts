import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
    constructor(
        private http: HttpService,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly usersService: UsersService,
    ) { }

    async getPosts() {
        return this.http
            .get('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                map((res) => res?.data),
                catchError(() => {
                    throw new ForbiddenException('API not available');
                }),
            );
    }

    async getPostsByUserId(userId: number) {
        try {
            // Fetch posts from the PostgreSQL database
            const postsFromDB = await this.postRepository.find({ where: { userId } });

            // Fetch posts from the external API
            const postsFromAPI = await this.http
                .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .pipe(
                    map((res) => res?.data),
                    catchError(() => {
                        throw new ForbiddenException('API not available');
                    }),
                )
                .toPromise();

            // Concatenate posts from the database and the API
            const combinedPosts = [...postsFromDB, ...postsFromAPI];
            return combinedPosts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new ForbiddenException('Error fetching posts');
        }
    }

    async createPost(createPostDto: CreatePostDto) {
        const { userId } = createPostDto;
        try {
            // Check if the user exists
            const existingUser = await this.usersService.findById(userId).toPromise();

            // Assuming PostEntity represents your database table for posts
            const newPost = this.postRepository.create({ ...createPostDto, userId: existingUser ? existingUser.id : null });
            const savedPost = await this.postRepository.save(newPost);
            return savedPost;
        } catch (error) {
            // Handle the error (e.g., log it) and proceed with creating the post without a user
            console.error('Error while checking user existence:', error);

            const newPostWithoutUser = this.postRepository.create(createPostDto);
            const savedPostWithoutUser = await this.postRepository.save(newPostWithoutUser);
            return savedPostWithoutUser;
        }
    }

    async updatePost(id: number, updatePostDto: CreatePostDto) {
        try {
            // const existingPost = await this.postRepository.findOne(postId);
            const existingPost = await this.postRepository.find({ where: { id } });

            if (!existingPost) {
                throw new NotFoundException('Post not found');
            }
    
            const updatedPost = await this.postRepository.save({
                ...existingPost,
                ...updatePostDto,
            });
    
            return updatedPost;
        } catch (error) {
            console.error('Error updating post:', error);
            throw new ForbiddenException('Error updating post');
        }
    }

    async deletePost(id: number) {
        try {
            const existingPost =  await this.postRepository.find({ where: { id } });

            if (!existingPost) {
                throw new NotFoundException('Post not found');
            }

            await this.postRepository.remove(existingPost);

            return { message: 'Post deleted successfully' };
        } catch (error) {
            console.error('Error deleting post:', error);
            throw new ForbiddenException('Error deleting post');
        }
    }
}