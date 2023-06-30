import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

enum HttpMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

const sendErrMessage = (res: NextApiResponse, method?: string) => {
	res.status(405).send('请求方法错误：该 API 不支持 [' + method || '未知' + '] 请求方法。');
}

export function Get(handler: NextApiHandler) {
	return (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method != HttpMethod.GET) {
			sendErrMessage(res, req.method)
		}
		handler(req, res)
	}
}

export function Post(handler: NextApiHandler) {
	return (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method != HttpMethod.POST) {
			sendErrMessage(res, req.method)
		}
		handler(req, res)
	}
}
