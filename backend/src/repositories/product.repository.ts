import { CreateProductDto, UpdateProductDto } from '../types/product.types';
import ProductModel, { ProductDocument } from '../models/Product';

export const productRepository = {

    findAll(): Promise<ProductDocument[]> {
        return ProductModel.find();
    },
    findById(id: string): Promise<ProductDocument | null> {
        return ProductModel.findById(id);
    },
    create(data: CreateProductDto): Promise<ProductDocument> {
        return ProductModel.create(data) as Promise<ProductDocument>;
    },
    update(id: string, data: UpdateProductDto): Promise<ProductDocument | null> {
        return ProductModel.findByIdAndUpdate(id, data, { new: true });
    },
    deleteById(id: string): Promise<ProductDocument | null> {
        return ProductModel.findByIdAndDelete(id);
    }
};
