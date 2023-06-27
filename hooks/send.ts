

export function useSend(url: string) {
	const controller = new AbortController();
	const signal = controller.signal;

	const send = async (body: any, init?: RequestInit) => {
		return await fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			...init,
			signal,
		});
	}

	const stop = () => {
		controller.abort();
	}

	return [send, stop]
}