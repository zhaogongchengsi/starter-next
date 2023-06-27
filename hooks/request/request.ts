
import useSWR, { BareFetcher, Key } from "swr";
import { createNprogress } from "@/lib/utils/progress";

function progressMiddleware(useSWRNext) {
	const np = createNprogress()
	return (key: Key, fetcher: BareFetcher, config: any) => {

		const extendedFetcher = (...args: any) => {
			np?.start()
			return fetcher(...args)
		}

		const swr = useSWRNext(key, extendedFetcher, Object.assign(config, { onSuccess() { np?.done() } }))
		return swr
	}
}


const defaultFetcher = (url: string) => fetch(url).then((res) => res.json());

export const useRequest = <T>(key: Key, options: any = {}, fetcher: BareFetcher<T> = defaultFetcher) => {
	return useSWR<T>(key, fetcher, {
		use: [progressMiddleware],

		...options
	});
}