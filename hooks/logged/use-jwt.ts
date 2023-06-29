import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const APP_JWT_STORAGE_KEY = 'starter-next-jwt'
const jwtAtom = atomWithStorage<UserPayload>(APP_JWT_STORAGE_KEY, {} as any)

export const useJwt = (): [() => string, (payload: UserPayload) => void, () => boolean] => {
	const [jwtData, setJwtData] = useAtom(jwtAtom)

	const verifyToken = () => {
		const now = Math.floor(Date.now() / 1000)
		return jwtData.expiresIn < now
	}

	// 获取前验证token 是否过期，若过期则返回空字符串
	const getJwt = () => {
		return !verifyToken() ? jwtData.token : ''
	}

	const setJwt = (payload: UserPayload) => {
		setJwtData(payload)
	}

	return [getJwt, setJwt, verifyToken]
}