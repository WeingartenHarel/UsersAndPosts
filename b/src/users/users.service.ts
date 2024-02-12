import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        private http: HttpService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getUsers() {
        return this.http
            .get('https://jsonplaceholder.typicode.com/users')
            .pipe(
                map((res) => res?.data),
            )
            .toPromise();
    }

    findById(userId: number): Observable<any> {
        return this.http
            .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .pipe(
                map((res) => res?.data),
                catchError(() => {
                    throw new ForbiddenException(`User with ID ${userId} not found`);
                }),
            );
    }

    async findByIdDB(id: any): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async createUser(userDto: User): Promise<User> {
        const newUser = this.userRepository.create(userDto);
        return await this.userRepository.save(newUser);
    }

    async updateUser(userId: any, userDto: any): Promise<User> {
        const existingUser = await this.userRepository.findOne(userId);
        if (!existingUser) {
            throw new ForbiddenException(`User with ID ${userId} not found`);
        }

        const updatedUser = { ...existingUser, ...userDto };
        return await this.userRepository.save(updatedUser);
    }

    async deleteFromDB(userId: any): Promise<void> {
        const existingUser = await this.userRepository.findOne(userId);
        if (!existingUser) {
            throw new ForbiddenException(`User with ID ${userId} not found`);
        }

        await this.userRepository.remove(existingUser);
    }
}