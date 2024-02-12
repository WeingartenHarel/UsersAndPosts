import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { User } from "./user.entity"; // Assuming User entity exists

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [HttpModule, TypeOrmModule.forFeature([User])], // Include TypeOrmModule.forFeature([User])
})
export class UsersModule {}