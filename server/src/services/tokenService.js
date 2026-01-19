import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const signAccessToken = (userId) => {
	return jwt.sign({ sub: userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m'
	});
};

export const signRefreshToken = (userId, sessionId) => {
	return jwt.sign({ sub: userId, sid: sessionId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '30d'
	});
};

export const verifyAccessToken = (token) => {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

export const decodeToken = (token) => jwt.decode(token);

export const hashRefreshToken = (token) => {
	return crypto.createHash('sha256').update(token).digest('hex');
};
