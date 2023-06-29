

const timeoutFunc = (timeout = 5000) => new Promise((_, reject) => {
	setTimeout(() => reject(new Error("Request timed out (请求超时)")), timeout);
})

export function useSend<T>(url: string, timeout = 5000): [send: (body: any, init?: RequestInit) => Promise<ResponseModel<T>>, stop: () => void] {
	const controller = new AbortController();
	const signal = controller.signal;

	const headers = new Headers({
		"Content-Type": "application/json",
		'Accept-Charset': 'utf-8',
		'Accept': "application/json",
	})

	// todo
	// Authorization: 'Bearer xxxxxxxx'
	// Cache-Control: 'no-cache'

	const send = (body: any, init?: RequestInit): Promise<ResponseModel<T>> => {

		return new Promise<ResponseModel<T>>((resolve, reject) => {
			Promise.race([
				fetch(url, {
					method: "POST",
					body: JSON.stringify(body),
					...init,
					signal,
					headers
				}),
				timeoutFunc(timeout),
			]).then((value: Response) => {
				resolve(value.json() as any)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	const stop = () => {
		controller.abort();
	}

	return [send, stop]
}