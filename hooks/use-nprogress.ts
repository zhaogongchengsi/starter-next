import { createNprogress } from "@/lib/utils/progress";


export function useNprogress() {
	const np = createNprogress()
	return {
		start() {
			np?.start()
		},
		done() {
			np?.done()
		}
	}
}