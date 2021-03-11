import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import CreateItemDto from './dto/create-item.dto';
@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private ItemModel: Model<Item>) {}
  async findAll(): Promise<Item[]> {
    return await this.ItemModel.find();
  }
  async findOne(id: string): Promise<Item> {
    return this.ItemModel.findById(id);
  }
  async create(item: CreateItemDto): Promise<Item> {
    const newItem = new this.ItemModel(item);
    return await newItem.save();
  }
  async delete(id: number): Promise<Item> {
    return await this.ItemModel.findByIdAndRemove(id);
  }
}
