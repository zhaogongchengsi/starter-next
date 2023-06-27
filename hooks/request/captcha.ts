import { useRequest } from "./request";

interface Captcha {
	id: string,
	url: string
}

export default function useCaptcha() {
	return useRequest<Captcha>("/api/captcha", { revalidateOnFocus: false, });
}