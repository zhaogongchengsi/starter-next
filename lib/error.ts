

export enum ResponseState {
	ok = 1,
	fail = 0
}

export interface NextResponse {
	state: ResponseState,
	message: string,
	error?: string | null,
	data?: any
	doc?: string
}

export const nextErrorResponse = (message: string, err?: any): NextResponse => {
	return { state: ResponseState.fail, message, error: err ? String(err) : null }
}

export const nextResponseWithData = (data: any, message: string = ''): NextResponse => {
	return { state: ResponseState.ok, data, message, error: null }
}