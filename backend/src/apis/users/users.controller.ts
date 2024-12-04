import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  @ApiOperation({ summary: 'Tạo user' })
  createUsers(@Body() userData: CreateUserDto) {
    return this.usersService.createUsers(userData);
  }
}
