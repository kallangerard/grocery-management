import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemTransaction } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { TransactItemDto } from './dto/transact-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }
  
  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }
  
  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove({ _id: id });
  }
}

@Injectable()
export class ItemTransactionService {
  constructor(@InjectModel(ItemTransaction.name) private transactModel: Model<ItemTransaction> ) {}
  
  async transact(transactItemDto: TransactItemDto): Promise<ItemTransaction> {
    const transactItem = new this.transactModel(transactItemDto);
    return await transactItem.save()
    
  }
}

