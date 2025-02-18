import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID:
        process.env.GOOGLE_CLIENT_ID ??
        (() => {
          throw new Error('client id missing');
        })(),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        (() => {
          throw new Error('client secret missing');
        })(),
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log('Google Profile:', profile);

    const user = await this.authService.validateOAuthUser(profile);
    return done(null, user);
  }
}
