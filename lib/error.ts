


export const nextErrorResponse = (message: string, err: any) => {
	return { message, error: String(err) }
}