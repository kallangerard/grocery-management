import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Item } from './item.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ItemService {
  // Construct a itemModel
  constructor(
    @InjectModel(Item) private readonly itemModel: ReturnModelType<typeof Item>,
  ) {}

  async transactItem(transactItemDto: { barcode: string }): Promise<Item> {
    const transactedItem = new this.itemModel(transactItemDto);
    return await transactedItem.save();
  }

  async findItemTransactions(barcode: string): Promise<Item[] | null> {
    return await this.itemModel.find({ barcode: barcode }).exec();
  }

  async getItemQuantity(barcode: string): Promise<Item[] | null> {
    return await this.itemModel
      .aggregate([
        { $match: { barcode: barcode } },
        { $group: { _id: '$barcode', sum: { $sum: '$quantity' } } },
      ])
      .exec();
  }

  async getItemsQuantity(): Promise<Item[] | null> {
    return await this.itemModel
      .aggregate([{ $group: { _id: '$barcode', sum: { $sum: '$quantity' } } }])
      .exec();
  }
}
