import { IProduct } from "../types/product.types";
import { Document, Schema, model } from "mongoose";

interface ProductDocument extends Omit<IProduct, '_id'>, Document {}

const productSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

const Product = model<ProductDocument>('Product', productSchema)

export default Product;