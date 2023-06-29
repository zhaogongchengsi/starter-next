
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import omit from 'lodash/omit'

export type UserInfo = Omit<UserResponse, "permissions" | "payload" | "roles">

const APP_USER_STORAGE_KEY = 'starter-next-user'
const userAtom = atomWithStorage<UserInfo>(APP_USER_STORAGE_KEY, {} as any)

export const useUser = (): [UserInfo, (user: UserResponse) => void] => {
	const [userInfo, setUserInfo] = useAtom(userAtom)

	const setUser = (user: UserResponse) => {
		setUserInfo(omit(user, ['permissions', 'payload', 'roles']))
	}

	return [userInfo, setUser]
}
