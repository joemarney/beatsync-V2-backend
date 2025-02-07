import { Injectable } from '@nestjs/common';
import { EventsService } from './events/events.service';

@Injectable()
export class AppService {
  constructor(private readonly eventsService: EventsService) {}

  async onModuleInit() {
    await this.eventsService.seedData();
  }
}
