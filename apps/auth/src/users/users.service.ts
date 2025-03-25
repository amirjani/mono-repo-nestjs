import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './models/user.schema';
import { hash as bcryptHash, compare as bcryptCompare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword: string = await bcryptHash(createUserDto.password, 10);
    const user = {
      ...createUserDto,
      password: hashedPassword,
    };
    return await this.userRepository.create(user);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    const isPasswordValid: boolean = await bcryptCompare(
      password,
      user.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }

    return user;
  }
}
