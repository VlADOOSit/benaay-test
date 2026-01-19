import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			error: 'VALIDATION_ERROR',
			message: 'Invalid request data',
			details: err.errors
		});
	}

	const status = err.statusCode || 500;
	const message = err.message || 'Internal server error';

	return res.status(status).json({
		error: status === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR',
		message
	});
};
