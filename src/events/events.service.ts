import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async onModuleInit() {
    await this.seedData();
  }

  async seedData() {
    console.log('Clearing existing events...');
    await this.eventRepository.clear();

    console.log('Seeding data...');
    await this.createEvent(
      'Invasion 3.0',
      '2025-05-24T17:00:00',
      'Lab 11',
      'https://placehold.co/150x250',
    );
    await this.createEvent(
      'Boomtown',
      '2025-08-06T14:00:00',
      'Matterley Estate',
      'https://placehold.co/150x250',
    );
    console.log('Data seeded!');
  }

  async createEvent(
    name: string,
    date: string,
    venue: string,
    poster: string,
  ): Promise<Event> {
    const event = new Event();
    event.name = name;
    event.date = date;
    event.venue = venue;
    event.poster = poster;
    return await this.eventRepository.save(event);
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }
}
