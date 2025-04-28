import { Product } from '../../products/model/product';
export interface Cart {
  id: number;
  date: string;
  quantity: number;
  products: Product[];
}
