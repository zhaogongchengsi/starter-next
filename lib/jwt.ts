import jwt from 'jsonwebtoken'

export function getJwtConfig() {
	const expiresIn = process.env.EXPIRES || '30'
	const issuer = process.env.ISSUER || 'app_abc'
	const jwtSalt = process.env.JWT_SALT || 'abcAbcAbc123'

	return { expiresIn, issuer, jwtSalt }
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
