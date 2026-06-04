import CartModel, { CartDocument } from '../models/Cart'

export const cartRepository = {
    findByUser(userId: string): Promise<CartDocument | null> {
        return CartModel.findOne({ user: userId }).populate('items.product');
    },
    findByUserRaw(userId: string): Promise<CartDocument | null> {
        return CartModel.findOne({ user: userId });
    },
    save(cart: CartDocument): Promise<CartDocument> {
        return cart.save();
    }
};