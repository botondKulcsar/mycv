import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });

    /* if (!user || user.id !== id) {
      throw new NotFoundException('User not found');
    } */

    /*  try {
      const user = await this.repo.findOneByOrFail({ id });
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    } */
  }

  find(email: string) {
    //returns an array
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    try {
      const user = await this.repo.findOneByOrFail({ id });
      Object.assign(user, attrs);
      return this.repo.save(user);
    } catch (error) {
      throw new NotFoundException('User not found');
    }

    /* const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs); // very important

    return this.repo.save(user); */
  }

  async remove(id: number) {
    try {
      const user = await this.repo.findOneByOrFail({ id });
      return this.repo.remove(user);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
    /* const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user); */
  }
}

/* Locate the findOne method and update the return to look like this:

findOne(id: number) {
  return this.repo.findOneBy({ id });
}
Locate the find method and update the return to look like this:

find(email: string) {
  return this.repo.find({ where: { email } });
} */
