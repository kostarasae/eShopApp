import { productRepository } from '../repositories/product.repository';
import { CreateProductDto, UpdateProductDto } from '../types/product.types';
import { ProductDocument } from '../models/Product';

export const productService = {
    async getAll(): Promise<ProductDocument[]> {
        return productRepository.findAll();
    },
    async getById(id: string): Promise<ProductDocument> {
        const result = await productRepository.findById(id);
        if (!result) throw Object.assign(new Error('Product not found'), { status: 404 });
        return result;
    },
    async create(data: CreateProductDto): Promise<ProductDocument> {
        return productRepository.create(data);
    },
    async update(id: string, data: UpdateProductDto): Promise<ProductDocument> {
        const result = await productRepository.update(id, data);
        if (!result) throw Object.assign(new Error('Product not found'), { status: 404 });
        return result;
    },
    async deleteById(id: string): Promise<boolean> {
        const result = await productRepository.deleteById(id);
        if (!result) throw Object.assign(new Error('Product not found'), { status: 404 });
        return true;
    }
};