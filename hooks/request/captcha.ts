import { useRequest } from "./request";


export default function useCaptcha() {
	return useRequest<{ id: string; url: string }>("/api/captcha");
}