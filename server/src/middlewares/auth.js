import { ApiError } from '../utils/apiError.js';
import * as tokenService from '../services/tokenService.js';

export const auth = (req, res, next) => {
	const header = req.headers.authorization || '';
	const [scheme, token] = header.split(' ');

	if (scheme !== 'Bearer' || !token) {
		return next(new ApiError(401, 'Missing access token'));
	}

	try {
		const payload = tokenService.verifyAccessToken(token);
		req.userId = payload.sub;
		return next();
	} catch (err) {
		return next(new ApiError(401, 'Invalid or expired access token'));
	}
};
