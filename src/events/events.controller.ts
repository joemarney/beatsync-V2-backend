import { Controller, Post, Get, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(
    @Body('name') name: string,
    @Body('date') date: string,
    @Body('venue') venue: string,
    @Body('poster') poster: string,
  ) {
    return await this.eventsService.createEvent(name, date, venue, poster);
  }

  @Get()
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }
}
