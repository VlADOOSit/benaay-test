import path from 'path';
import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './config/db.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const start = async () => {
	try {
		await connectDB();
		const port = process.env.PORT || 3001;
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (err) {
		console.error('Failed to start server', err);
		process.exit(1);
	}
};

start();
