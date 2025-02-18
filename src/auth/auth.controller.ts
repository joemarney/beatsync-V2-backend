import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const user = await req.user;

    if (!user.username) {
      return res.redirect('http://localhost:3000/set-username');
    }

    return res.redirect(
      `http://localhost:3000/dashboard?token=${user.jwtToken}`,
    );
  }
}
