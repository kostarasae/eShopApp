import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
  code?: number;
}

export function errorMiddleware(err: AppError, req: Request, res: Response, next: NextFunction): void {
    switch (err.name) {
        case 'ValidationError': res.status(400).json({ message: err.message }); return;
        case 'CastError':       res.status(404).json({ message: 'Invalid ID' }); return;
        case 'JsonWebTokenError': res.status(401).json({ message: err.message }); return;
    }
    if (err.code === 11000) { 
        res.status(409).json({ message: 'Duplicate key' }); 
        return; 
    }
    const status = err.status ?? 500;
    res.status(status).json({ message: err.message || 'Internal server error' });
}