import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ required: true, index: true, unique: true })
  barcode: string;

  @Prop({ required: false })
  name: string;
}

@Schema()
export class ItemTransaction extends Document {
  @Prop({ required: true, index: true })
  barcode: string;
  @Prop({ required: true })
  quantity: number;
  @Prop()
}

export const ItemSchema = SchemaFactory.createForClass(Item);
export const TransactSchema = SchemaFactory.createForClass(ItemTransaction);
