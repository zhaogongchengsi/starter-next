import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from '@/lib/method'

const register: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.send({ body: req.body })
}

export default Post(register)
