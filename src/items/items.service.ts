import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '56787656',
      name: 'John',
      qty: 67,
      description: 'this is not bad',
    },
    {
      id: '5678656',
      name: 'paul',
      qty: 67,
      description: 'this is good',
    },
    {
      id: '56776562',
      name: 'Johnpa',
      qty: 67,
      description: 'this is not bad',
    },
  ];
  findAll(): Item[] {
    return this.items;
  }
  findOne(id: string) {
    return this.items.find((item) => item.id === id);
  }
}
