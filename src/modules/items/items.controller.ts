import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
// import {JoiValidationPipe} from '../pipes/Joivalidator.pipe';
import CreateItemDto from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { ObjectId } from 'mongoose';
import { ObjectIdPipe } from '../../common/pipes/object-id.pipe';
import { AuthGuard } from './../../common/guards/auth.guard';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ObjectIdPipe) id: ObjectId): Promise<Item> {
    return this.itemsService.findOne(id);
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
