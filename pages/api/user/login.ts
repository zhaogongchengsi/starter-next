import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Post } from '@/lib/method'


const login: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	res.send({ name: 'admin' })
}

export default Post(login)