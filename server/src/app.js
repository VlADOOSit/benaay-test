import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CORS_ORIGIN || '*',
		credentials: true
	})
);

app.get('/health', (req, res) => {
	res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);
