import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createSvgCaptcha } from '@/lib/captcha'


const captcha: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { data, id } = await createSvgCaptcha()
	// const base = Buffer.from(data).toString('base64')
	// const url =`data:image/png;base64,${base}`
	res.send({ id, url: data })
}

export default captcha