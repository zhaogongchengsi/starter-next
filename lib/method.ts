import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

enum HttpMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

const sendErrMessage = (method: string, res: NextApiResponse) => {
	res.status(405).send('请求方法错误：该 API 不支持 ' + method + ' 请求方法。');
}

export function Get(handler: NextApiHandler) {
	return (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method != HttpMethod.GET) {
			sendErrMessage(req.method, res)
		}
		handler(req, res)
	}
}

export function Post(handler: NextApiHandler) {
	return (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method != HttpMethod.POST) {
			sendErrMessage(req.method, res)
		}
		handler(req, res)
	}
}
