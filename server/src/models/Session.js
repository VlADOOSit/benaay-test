import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		refreshTokenHash: {
			type: String,
			required: true
		},
		expiresAt: {
			type: Date,
			required: true
		},
		userAgent: {
			type: String
		},
		ip: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Session', sessionSchema);
