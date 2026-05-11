import mongoose from 'mongoose';
import { config } from './env';

export async function connectToDatabase() {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB');
}