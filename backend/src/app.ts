import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./config/swagger";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(errorMiddleware);

export default app;