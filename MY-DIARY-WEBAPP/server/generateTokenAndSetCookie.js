import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

	res.cookie("token", token, {
		secure: process.env.NODE_ENV === "production",
		expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		httpOnly: true,
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	return token;
};
