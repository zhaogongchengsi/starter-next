
import { pbkdf2Sync } from 'crypto'
import passwordValidator from 'password-validator'

export function getGenerateConfig() {
	const salt = process.env.SALT
	const iterations = parseInt(process.env.ITERATIONS || "500")
	const keyLength = parseInt(process.env.KEYLENGTH || "64")
	const digest = process.env.DIGEST

	return Object.assign({
		salt: 'abcAbcCab',
		iterations: 500,
		keyLength: 64,
		digest: 'sha512'
	}, { salt, iterations, keyLength, digest })
}

export function generateFromPassword(password: string) {
	const { salt, iterations, keyLength, digest } = getGenerateConfig()
	const newKey = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
	return newKey
}

export function compareHashAndPassword(hash: string, password: string) {
	const pas = generateFromPassword(password)
	return hash === pas
}


var schema = new passwordValidator();

schema.is()
	// 最小6位
	.min(6)
	//  最大 16位
	.is().max(16)
	// 必须有小写字母   
	.letters()
	.symbols(1)
	// 至少两位数字
	.has().digits(2)
	// 不允许有空格                   
	.has().not().spaces()
	.is().not().oneOf([]);

// 验证密码强度
export function validator(password: string) {
	return schema.validate(password) as boolean
}