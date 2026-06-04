export interface ICartItem {
  product: string;
  quantity: number;
}

export interface ICart {
  user: string;
  items: ICartItem[];
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
}