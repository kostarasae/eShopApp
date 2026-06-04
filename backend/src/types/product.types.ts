export interface IProduct {
    _id?: string,
    name: string,
    description?: string,
    price: number,
    category: string,
    stock: number,
    imageUrl?: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface CreateProductDto {
    name: string,
    description?: string,
    price: number,
    category: string,
    stock?: number,
    imageUrl?: string
}

export interface UpdateProductDto {
    name?: string,
    description?: string,
    price?: number,
    category?: string,
    stock?: number,
    imageUrl?: string
}