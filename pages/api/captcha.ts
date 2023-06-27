import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createSvgCaptcha, clearExpirationTimeCaptcha, deleteCaptcha } from '@/lib/captcha'
import { nextErrorResponse } from "@/lib/error";

const captcha: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

	try {
		if (req.method === "DELETE") {
			const id = req.query['id']

			if (id) {
				await deleteCaptcha(id as string)
				res.send({ message: "删除成功" })
				return
			}

			const { count } = await clearExpirationTimeCaptcha()
			res.send({ message: "成功" + count + "条过期验证码" })
			return
		}

		const { data, id } = await createSvgCaptcha()
		res.send({ id, url: data })
	} catch (err) {
		res.send(nextErrorResponse('验证码操作失败', err))
	}
}

export default captcha