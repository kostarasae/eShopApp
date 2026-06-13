import { ProductDocument } from "../models/Product"

export const toProductResponse = (doc: ProductDocument) => {
    return {
        id: doc._id.toString(),
        name: doc.name,
        price: doc.price,
        category: doc.category,
        description: doc.description,
        stock: doc.stock,
        imageUrl: doc.imageUrl,
        createdAt: doc.createdAt
    };
};