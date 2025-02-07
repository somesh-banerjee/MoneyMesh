import { Injectable } from '@nestjs/common';
// imports for db call using typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async findOneById(id: number) {
    return this.userRepository.findOneByOrFail({ id });
  }
}
