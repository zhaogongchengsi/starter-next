import jwt from 'jsonwebtoken'

export function getJwtConfig() {
	const expiresIn = process.env.EXPIRES
	const issuer = process.env.ISSUER
	const jwtSalt = process.env.JWT_SALT

	return Object.assign({ expiresIn, issuer, jwtSalt }, { expiresIn: '30', issuer: "app_abc", jwtSalt: 'abcAbcAbc123' })
}

export function issueToken(payload: string | object) {
	const { expiresIn, issuer, jwtSalt } = getJwtConfig()

	const exp = Math.floor(Date.now() / 1000) + (60 * Number(expiresIn))

	const token = jwt.sign(payload, jwtSalt, { issuer, expiresIn: exp });

	return {
		expiresIn: exp,
		token
	}
}

export function verifyToken<P>(token: string): Promise<{ success: boolean, payload: P, error?: any }> {
	const { jwtSalt } = getJwtConfig()
	return new Promise((resolve, reject) => {
		jwt.verify(token, jwtSalt, (err, decoded) => {
			if (!err) {
				resolve({
					success: true,
					payload: decoded as P
				})
			}
			reject({
				success: false,
				error: err
			})
		});
	})
}
