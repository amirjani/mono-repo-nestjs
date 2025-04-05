import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './models/user.schema';
import { hash as bcryptHash, compare as bcryptCompare } from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.validateCreateUser(createUserDto);

    const hashedPassword: string = await bcryptHash(createUserDto.password, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };
    return await this.userRepository.create(user);
  }

  private async validateCreateUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  }

  async verifyUser(email: string, password: string) {
    console.log('email', email);
    const user = await this.userRepository.findOne({ email });
    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const isPasswordValid: boolean = await bcryptCompare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.userRepository.findOne(getUserDto);
  }
}
