import 'dotenv/config';
import { config } from './config/env';
import app from './app';
import { connectToDatabase  } from "./config/database";

async function start(): Promise<void> {
    await connectToDatabase();
    app.listen(config.port, () => console.log(`Listening port ${config.port}`));
}

start().catch(console.error);