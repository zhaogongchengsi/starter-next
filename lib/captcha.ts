import { ConfigObject, create } from 'svg-captcha'
import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler';
import prisma from './prisma'

// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
// 五分钟执行一次清理过期验证码
const CleanupInterval = 5
const scheduler = new ToadScheduler();

// async function deleteCap() {
// 	const tablenames = await prisma.$queryRaw<
// 		Array<{ tablename: string }>
// 	>`SELECT tablename FROM pg_tables WHERE schemaname='public'`
// }

const task = new Task('clearCaptcha', () => {
	// const now = new Date();
	// prisma.captcha.delete({
	// 	where: {
	// 		expirationTime
	// 	}
	// })
	console.log('正在执行清理操作')
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
	const later = new Date(now.getTime() + CleanupInterval * 60 * 1000);
	const id = uuidv4()
	await prisma.captcha.create({
		data: {
			id,
			value: captcha.text,
			data: captcha.data,
			expirationTime: later
		}
	})
	return { id, data: captcha.data }
}
