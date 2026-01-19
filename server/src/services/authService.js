import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Session from '../models/Session.js';
import { ApiError } from '../utils/apiError.js';
import * as tokenService from './tokenService.js';

const createSessionAndTokens = async ({ userId, userAgent, ip }) => {
	const session = await Session.create({
		user: userId,
		refreshTokenHash: 'pending',
		expiresAt: new Date(0),
		userAgent,
		ip
	});

	const refreshToken = tokenService.signRefreshToken(userId, session._id.toString());
	const accessToken = tokenService.signAccessToken(userId);
	const refreshTokenHash = tokenService.hashRefreshToken(refreshToken);
	const decoded = tokenService.decodeToken(refreshToken);

	if (!decoded || !decoded.exp) {
		throw new ApiError(500, 'Failed to generate refresh token');
	}

	session.refreshTokenHash = refreshTokenHash;
	session.expiresAt = new Date(decoded.exp * 1000);
	await session.save();

	return { accessToken, refreshToken, session };
};

export const register = async ({ fullName, email, password, userAgent, ip }) => {
	const existing = await User.findOne({ email });
	if (existing) {
		throw new ApiError(409, 'Email already in use');
	}

	const passwordHash = await bcrypt.hash(password, 12);
	const user = await User.create({ fullName, email, passwordHash });

	const tokens = await createSessionAndTokens({ userId: user._id, userAgent, ip });
	return { user, ...tokens };
};

export const login = async ({ email, password, userAgent, ip }) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new ApiError(401, 'Invalid credentials');
	}

	const matches = await bcrypt.compare(password, user.passwordHash);
	if (!matches) {
		throw new ApiError(401, 'Invalid credentials');
	}

	const tokens = await createSessionAndTokens({ userId: user._id, userAgent, ip });
	return { user, ...tokens };
};

export const refresh = async ({ refreshToken, userAgent, ip }) => {
	if (!refreshToken) {
		throw new ApiError(401, 'Missing refresh token');
	}

	let payload;
	try {
		payload = tokenService.verifyRefreshToken(refreshToken);
	} catch (err) {
		throw new ApiError(401, 'Invalid or expired refresh token');
	}

	const session = await Session.findById(payload.sid);
	if (!session) {
		throw new ApiError(401, 'Session not found');
	}

	const incomingHash = tokenService.hashRefreshToken(refreshToken);
	if (incomingHash !== session.refreshTokenHash) {
		await Session.deleteOne({ _id: session._id });
		throw new ApiError(401, 'Refresh token reuse detected');
	}

	const newRefreshToken = tokenService.signRefreshToken(payload.sub, session._id.toString());
	const newAccessToken = tokenService.signAccessToken(payload.sub);
	const newHash = tokenService.hashRefreshToken(newRefreshToken);
	const decoded = tokenService.decodeToken(newRefreshToken);

	if (!decoded || !decoded.exp) {
		throw new ApiError(500, 'Failed to generate refresh token');
	}

	session.refreshTokenHash = newHash;
	session.expiresAt = new Date(decoded.exp * 1000);
	session.userAgent = userAgent || session.userAgent;
	session.ip = ip || session.ip;
	await session.save();

	return { accessToken: newAccessToken, refreshToken: newRefreshToken, session };
};

export const logout = async ({ refreshToken }) => {
	if (!refreshToken) {
		return;
	}

	try {
		const payload = tokenService.verifyRefreshToken(refreshToken);
		await Session.deleteOne({ _id: payload.sid });
	} catch (err) {
		return;
	}
};

export const getMe = async (userId) => {
	const user = await User.findById(userId).select('-passwordHash');
	if (!user) {
		throw new ApiError(404, 'User not found');
	}
	return user;
};
