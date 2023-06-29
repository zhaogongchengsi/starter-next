import { ConfigObject, create } from 'svg-captcha'
import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler';
import prisma from './prisma'

// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
// 五分钟执行一次清理过期验证码
const CleanupInterval = 5
const scheduler = new ToadScheduler();

export async function clearExpirationTimeCaptcha() {
	//  await prisma.$queryRaw`DELETE FROM captcha WHERE expiration_time < NOW();`
	const now = new Date();
	return await prisma.captcha.deleteMany({
		where: {
			// expirationTime: { lte: now },
			// isUse: true,
			OR: [
				{ expirationTime: { lte: now } },
				{ isUse: true }
			]
		}
	})
}

const task = new Task('clearCaptcha', () => {
	clearExpirationTimeCaptcha().catch(err => console.log(err))
});

const clearCaptcha = new SimpleIntervalJob(
	{ minutes: CleanupInterval, runImmediately: true },
	task,
	{ id: 'clearCaptcha' }
);

scheduler.addSimpleIntervalJob(clearCaptcha);

export const options: ConfigObject = {
	size: 4,
	ignoreChars: '0oi1',
	noise: 2,
	background: "#ffffff"
}

export const createSvgCaptcha = async () => {
	const now = new Date();
	var captcha = create(options);
	const fiveMinutesLaterTimestamp = now.getTime() + CleanupInterval * 60 * 1000;
	const id = uuidv4()
	await prisma.captcha.create({
		data: {
			id,
			value: captcha.text.toLowerCase().trim(),
			data: captcha.data,
			expirationTime: new Date(fiveMinutesLaterTimestamp)
		}
	})
	return { id, data: captcha.data }
}

export const deleteCaptcha = async (id: string) => {
	return await prisma.captcha.deleteMany({
		where: {
			id
		}
	})
}

export const verifyCaptcha = async (id: string, value: string): Promise<boolean> => {

	const val = await prisma.captcha.findFirst({
		where: {
			id,
			value: value.toLowerCase(),
			isUse: false
		}
	})

	if (!val) {
		return false
	}


	await prisma.captcha.deleteMany({
		where: {
			id,
		},
	})


	return true

}