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

export interface CreateProductDTO {
    name: string,
    description?: string,
    price: number,
    category: string,
    stock?: number,
    imageUrl?: string
}

export interface UpdateProductDTO {
    name?: string,
    description?: string,
    price?: number,
    category?: string,
    stock?: number,
    imageUrl?: string
}