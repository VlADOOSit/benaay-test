import * as authService from '../services/authService.js';

const getCookieOptions = () => ({
	httpOnly: true,
	secure: process.env.REFRESH_COOKIE_SECURE === 'true',
	sameSite: process.env.REFRESH_COOKIE_SAMESITE || 'lax',
	maxAge: 1000 * 60 * 60 * 24 * 30
});

const getRefreshCookieName = () => process.env.REFRESH_COOKIE_NAME || 'refreshToken';
const shouldIncludeRefreshInBody = () => process.env.DEV_REFRESH_IN_BODY === 'true';

const setRefreshCookie = (res, refreshToken) => {
	res.cookie(getRefreshCookieName(), refreshToken, getCookieOptions());
};

const clearRefreshCookie = (res) => {
	res.clearCookie(getRefreshCookieName(), getCookieOptions());
};

export const register = async (req, res, next) => {
	try {
		const { fullName, email, password } = req.body;
		const result = await authService.register({
			fullName,
			email,
			password,
			userAgent: req.headers['user-agent'],
			ip: req.ip
		});

		setRefreshCookie(res, result.refreshToken);

		const response = {
			user: {
				id: result.user._id,
				fullName: result.user.fullName,
				email: result.user.email
			},
			accessToken: result.accessToken
		};

		if (shouldIncludeRefreshInBody()) {
			response.refreshToken = result.refreshToken;
		}

		res.status(201).json(response);
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const result = await authService.login({
			email,
			password,
			userAgent: req.headers['user-agent'],
			ip: req.ip
		});

		setRefreshCookie(res, result.refreshToken);

		const response = {
			user: {
				id: result.user._id,
				fullName: result.user.fullName,
				email: result.user.email
			},
			accessToken: result.accessToken
		};

		if (shouldIncludeRefreshInBody()) {
			response.refreshToken = result.refreshToken;
		}

		res.json(response);
	} catch (err) {
		next(err);
	}
};

export const refresh = async (req, res, next) => {
	try {
		const refreshToken = req.cookies[getRefreshCookieName()];
		const result = await authService.refresh({
			refreshToken,
			userAgent: req.headers['user-agent'],
			ip: req.ip
		});

		setRefreshCookie(res, result.refreshToken);

		const response = { accessToken: result.accessToken };
		if (shouldIncludeRefreshInBody()) {
			response.refreshToken = result.refreshToken;
		}

		res.json(response);
	} catch (err) {
		next(err);
	}
};

export const logout = async (req, res, next) => {
	try {
		const refreshToken = req.cookies[getRefreshCookieName()];
		await authService.logout({ refreshToken });
		clearRefreshCookie(res);
		res.status(204).send();
	} catch (err) {
		next(err);
	}
};

export const me = async (req, res, next) => {
	try {
		const user = await authService.getMe(req.userId);
		res.json({ user });
	} catch (err) {
		next(err);
	}
};
