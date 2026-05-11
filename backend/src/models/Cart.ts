import { ICart } from '../types/cart.types';
import mongoose, { Document, model, Schema } from 'mongoose';

interface CartItemDocument extends Document {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

interface CartDocument extends Omit<ICart, '_id' | 'user' | 'items'>, Document {
    user: mongoose.Types.ObjectId;
    items: CartItemDocument[];
}

const cartSchema = new Schema<CartDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
}, { timestamps: true });

const Cart = model<CartDocument>('Cart', cartSchema);

export default Cart;