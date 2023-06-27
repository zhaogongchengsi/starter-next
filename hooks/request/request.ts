
import useSWR, { BareFetcher, Key } from "swr";
import { createNprogress } from "@/lib/utils/progress";

function progressMiddleware(useSWRNext) {
	const np = createNprogress()
	return (key: Key, fetcher: BareFetcher, config: any) => {
		np?.start()
		const swr = useSWRNext(key, fetcher, config)
		np?.done()
		return swr
	}
}


export const useRequest = <T>(key: Key, fetcher: BareFetcher<T>) => {
	return useSWR<T>(key, fetcher, {
		use: [progressMiddleware]
	});
}