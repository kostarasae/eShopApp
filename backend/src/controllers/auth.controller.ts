import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";
import { toUserResponse } from "../mappers/user.mapper";

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
    },
    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await authService.getMe(req.user!.id);
            res.json(toUserResponse(user));
        } catch (error) {
            next(error);
        }
    }
};