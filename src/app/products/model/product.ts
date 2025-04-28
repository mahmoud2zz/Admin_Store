export interface Product {
  id: number;
  title: string;
  price: number;
  decription: string;
  quantity: number;
  image: string | File;
  categoryName: string;
  categoryId: number;
}
