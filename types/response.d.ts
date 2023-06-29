
interface ResponseModel<T> {
	data: T,
	message: string,
	error?: string,
	doc?: string,
	state: 1 | 0
}