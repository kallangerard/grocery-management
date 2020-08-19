import { Controller, Get, Body, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { TransactItemDto } from './dto/transact-item.dto';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @Post('transact')
  transact(@Body() transactItemDto: TransactItemDto): string {
    return `Item Transaction ${transactItemDto.barcode} ${transactItemDto.quantity}`;
  }
}
