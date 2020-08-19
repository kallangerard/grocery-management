import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.model';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('transact')
  async transactItem(@Body() item: Item): Promise<Item> {
    return await this.itemService.transactItem(item);
  }

  @Get('transactions:id')
  async findItem(@Param('id') barcode: string): Promise<Item[] | null> {
    console.log(barcode);
    return await this.itemService.findItemTransactions(barcode);
  }

  @Get('quantity:id')
  async getItemQuantity(@Param('id') barcode: string): Promise<Item[] | null> {
    return await this.itemService.getItemQuantity(barcode);
  }

  @Get('quantities')
  async getItemsQuanity(): Promise<Item[] | null> {
    return await this.itemService.getItemsQuantity();
  }
}
