import { CreateProductDto, ProductFilters, UpdateProductDto } from '../../../shared/types/product.types';
import ProductModel, { ProductDocument } from '../models/Product';

export const productRepository = {

    async findAll(filters: ProductFilters): Promise<{ products: ProductDocument[]; total: number }> {
        const { page = 1, limit = 12, category, minPrice, maxPrice, sort = '-createdAt' } = filters;
        const query: Record<string, any> = {};
        if (category) query.category = category;
        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};
            if (minPrice !== undefined) query.price.$gte = minPrice;            
            if (maxPrice !== undefined) query.price.$lte = maxPrice;
        }
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            ProductModel.find(query).sort(sort).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ]);
        return { products, total };
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
