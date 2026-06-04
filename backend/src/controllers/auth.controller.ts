import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export const authController = {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.register(req.body);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await authService.login(req.body);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
};