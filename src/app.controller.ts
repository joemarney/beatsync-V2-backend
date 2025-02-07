import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('beatsync')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('venues')
  getVenues() {
    return [
      { id: 1, name: 'Lab 11', city: 'Birmingham' },
      { id: 2, name: 'Fabric', city: 'London' },
      { id: 3, name: 'Motion', city: 'Bristol' },
    ];
  }
}
