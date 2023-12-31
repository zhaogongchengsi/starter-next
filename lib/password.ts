
import { timingSafeEqual } from 'crypto'
import passwordValidator from 'password-validator'
import CryptoJS from 'crypto-js';

export function getGenerateConfig() {
	const salt = process.env.SALT || "asdhaosidhasiohdaiogergh213!@asdj"
	const iterations = parseInt(process.env.ITERATIONS || "100")
	const keyLength = parseInt(process.env.KEYLENGTH || "10")

	return { salt, iterations, keyLength }
}

export function generateFromPassword(password: string) {
	const { salt, iterations, keyLength } = getGenerateConfig()
	const key = CryptoJS.PBKDF2(password, salt, {
		keySize: keyLength,
		iterations: iterations
	});
	return key.toString(CryptoJS.enc.Hex)
}

export function compareHashAndPassword(hash: string, password: string) {
	const pas = generateFromPassword(password)

	const buffer_hash = Buffer.from(hash, 'hex');
	const buffer_password = Buffer.from(pas, 'hex');

	if (buffer_hash.byteLength !== buffer_password.byteLength) {
		const length = Math.max(buffer_hash.byteLength, buffer_password.byteLength);
		const newHashBuffer = Buffer.alloc(length);
		const newPasswordBuffer = Buffer.alloc(length);

		newHashBuffer.copy(newHashBuffer);
		newPasswordBuffer.copy(newPasswordBuffer);

		// 对新缓冲区进行比较操作
		return timingSafeEqual(newHashBuffer, newPasswordBuffer);
	}

	return timingSafeEqual(buffer_hash, buffer_password);
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