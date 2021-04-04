import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import {JoiValidationPipe} from '../pipes/Joivalidator.pipe';
import CreateItemDto from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { isValidObjectId, ObjectId } from 'mongoose';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<Item> {
    if (isValidObjectId(id)) {
      return this.itemsService.findOne(id);
    }
    throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.delete(id);
  }

  @Put(':id')
  update(@Body() body: CreateItemDto, @Param('id') id: number): string {
    return `successfully updated ${body.description} ${id}`;
  }
}
