import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";
import { toProductResponse } from "../mappers/product.mapper";

export const productController = {
    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await productService.getAll();
            res.json(products.map(toProductResponse));
        } catch (error) {
            next(error);
        }
    },
    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await productService.getById(req.params.id as string);
            res.json(toProductResponse(product));
        } catch (error) {
            next(error);
        }
    },
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await productService.create(req.body);
            res.status(201).json(toProductResponse(product));
        } catch (error) {
            next(error);
        }
    },
    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const product = await productService.update(req.params.id as string, req.body);
            res.json(toProductResponse(product));
        } catch (error) {
            next(error);
        }
    },
    async deleteById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await productService.deleteById(req.params.id as string);
            res.json({ message: 'Product deleted' });
        } catch (error) {
            next(error);
        }
    }
};