import { prop } from '@typegoose/typegoose';

export class Item {
  @prop({ required: true, index: true })
  public barcode: string;
  @prop({ required: true})
  public quantity: number;
}
