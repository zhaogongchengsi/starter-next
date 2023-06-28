import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from '@/lib/method'
import { z } from "zod";
import { account, captcha, password } from "~/schemas/login";
import { nextErrorResponse, nextResponseWithData } from "@/lib/error";
import { sendZodErrorMessage } from "@/lib/utils/sendZodError";
import { verifyCaptcha } from "@/lib/captcha";
import prisma from '@/lib/prisma'
import { compareHashAndPassword } from "@/lib/password";

const loginForm = z.object({
	account,
	password,
	captcha: z.object({
		id: z.string().uuid({ message: "验证码 id 无效" }),
		value: captcha
	}),
}).required();

const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

	const result = await loginForm.spa(req.body)
	if (!result.success) {
		const err = (result as any).error
		const message = sendZodErrorMessage(err)
		res.send(nextErrorResponse(sendZodErrorMessage(err), new Error(message)))
		return
	}

	const { data } = result
	const isOk = await verifyCaptcha(data.captcha.id, data.captcha.value).catch(err => { res.send(nextErrorResponse("验证码验证失败", err)); return })

	if (!isOk) {
		res.send(nextErrorResponse("验证码无效"))
		return
	}


	const user = await prisma.user.findFirst({
		where: {
			phone: data.account,
		}
	}).catch(err => { res.send(nextErrorResponse("查找用户失败")); return })

	if (!user) {
		res.send(nextErrorResponse("用户不存在"))
		return
	}


	if (!compareHashAndPassword(user.password, data.password)) {
		res.send(nextErrorResponse("密码错误"))
		return
	}

	delete user['password']

	const userResult = {
		user,
		// todo: token
	}

	res.send(nextResponseWithData(userResult, '登录成功'))

}

export default Post(login)