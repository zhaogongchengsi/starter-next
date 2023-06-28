

export function sendZodErrorMessage(err: any) {
	const errors: { code: string, message: string, type: string, path: string[] }[] = err.errors
	const messages = []
	errors.forEach(({ message }) => {
		messages.push(message)
	})
	return messages.join(',')
}