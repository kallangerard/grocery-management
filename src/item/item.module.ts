import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Item } from './item.model';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

@Module({
  imports: [TypegooseModule.forFeature([Item])],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
