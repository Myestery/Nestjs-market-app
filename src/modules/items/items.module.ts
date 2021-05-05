import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemSchema } from './schemas/item.schema';
@Module({
  imports: [
  MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    // ApiModule
  ],
  exports: [],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
