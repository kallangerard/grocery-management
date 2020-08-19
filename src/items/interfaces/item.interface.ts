export interface ItemTransaction {
  barcode: string;
  quantity: number;
}

export interface Item {
  barcode: string;
  name?: string;
}
