import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from '@/lib/method'
import { z } from "zod";
import { account, password } from "~/schemas/login";
import { sendZodErrorMessage } from "@/lib/utils/sendZodError";
import { nextErrorResponse, nextResponseWithData } from "@/lib/error";
import prisma from '@/lib/prisma'

const registerForm = z.object({
	account,
	password,
}).required();


const register: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

	const result = await registerForm.spa(req.body)

	if (!result.success) {
		const err = (result as any).error
		const message = sendZodErrorMessage(err)
		res.send(nextErrorResponse(sendZodErrorMessage(err), new Error(message)))
		return
	}

	const { account, password } = result.data
	const isExit = await prisma.user.findFirst({
		where: {
			phone: account
		}
	})

	if (isExit) {
		res.send(nextErrorResponse(`${account} 已经存在`))
		return
	}

	const newUser = await prisma.user.create({
		data: {
			password,
			phone: account
		}
	}).catch(err => { res.send(nextErrorResponse(`注册失败，请重试`, err)); return })

	delete newUser['password']

	res.send(nextResponseWithData(newUser, '注册成功'))
}

export default Post(register)
