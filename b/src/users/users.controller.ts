import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string): Promise<User> {
    return this.usersService.findByIdDB(+userId);
  }

  @Post()
  createUser(@Body() userDto: any): Promise<User> {
    return this.usersService.createUser(userDto);
  }

  @Put(':id')
  updateUser(@Param('id') userId: string, @Body() userDto: any): Promise<User> {
    return this.usersService.updateUser(+userId, userDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string): Promise<void> {
    return this.usersService.deleteFromDB(+userId);
  }

}