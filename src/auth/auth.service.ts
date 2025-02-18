import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Profile } from 'passport-google-oauth20';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateOAuthUser(profile: Profile) {
    console.log('Google Profile Data:', profile);

    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error('Google account does not have an email associated');
    }

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        username: profile.displayName,
        email,
        googleId: profile.id,
      });

      await this.userRepository.save(user);
    }

    return user;
  }
}
