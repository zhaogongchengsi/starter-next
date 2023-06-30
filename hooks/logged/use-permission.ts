import { buildPages } from '@/lib/utils/menu'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const APP_ROLES_STORAGE_KEY = 'starter-next-roles'
const APP_PAGE_STORAGE_KEY = 'starter-next-pages'
// const APP_APIS_STORAGE_KEY = 'starter-next-apis'
const APP_PRES_STORAGE_KEY = 'starter-next-pres'

const rolesAtom = atomWithStorage<Role[]>(APP_ROLES_STORAGE_KEY, [])
const pagesAtom = atomWithStorage<Menu[]>(APP_PAGE_STORAGE_KEY, [])
const permissionsAtom = atomWithStorage<Permission[]>(APP_PRES_STORAGE_KEY, {} as any)


export const usePermission = (): [{ roles: Role[], menu: Menu[], permissions: Permission[] }, (user: UserResponse) => void] => {
	const [roles, setRole] = useAtom(rolesAtom)
	const [menu, setPages] = useAtom(pagesAtom)
	const [pres, setPres] = useAtom(permissionsAtom)

	const setPermissions = (user: UserResponse) => {
		const { permissions } = user
		setRole(user.roles)
		setPres(permissions)

		const menuItems: Menu[] = permissions.reduce((result, permission) => {
			const items = permission.menus?.filter(item => !result.find(i => i.id === item.id));
			return [...result, ...items || []];
		}, [] as Menu[]);

		const menus = buildPages(menuItems)

		setPages(menus)
	}

	return [{ roles, menu, permissions: pres }, setPermissions]
}
