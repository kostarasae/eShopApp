export interface ICartItem {
  product: string;
  quantity: number;
}

export interface ICart {
  user: string;
  items: ICartItem[];
}

export interface AddToCartDTO {
  productId: string;
  quantity: number;
}