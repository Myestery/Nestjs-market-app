import { Injectable, Res, HttpException } from '@nestjs/common';
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
    return await this.ItemModel.findById(id);
  }
  async create(item: CreateItemDto): Promise<Item> {
    const newItem = new this.ItemModel(item);
    return await newItem.save();
  }
  async delete(id: string): Promise<Item> {
    let deleted = await this.ItemModel.findByIdAndRemove(id);
    if (deleted)
    {
      return deleted
    }
      throw new HttpException("not found",404);
  }
}
