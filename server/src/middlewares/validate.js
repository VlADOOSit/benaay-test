export const validate = (schema) => (req, res, next) => {
	schema.parse(req.body);
	next();
};
