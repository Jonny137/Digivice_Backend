import express from 'express';
import { connect } from './database/database';
import router from './api/routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT as string) || 7000;

export default app;

app.use(router);

// Database connection
connect();

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
