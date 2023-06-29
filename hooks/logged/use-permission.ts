import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const APP_ROLES_STORAGE_KEY = 'starter-next-roles'
const APP_PAGE_STORAGE_KEY = 'starter-next-pages'
// const APP_APIS_STORAGE_KEY = 'starter-next-apis'
const APP_PRES_STORAGE_KEY = 'starter-next-pres'

const rolesAtom = atomWithStorage<Role[]>(APP_ROLES_STORAGE_KEY, [])
const pagesAtom = atomWithStorage<Page[]>(APP_PAGE_STORAGE_KEY, [])
const permissionsAtom = atomWithStorage<Permission[]>(APP_PRES_STORAGE_KEY, {} as any)


function buildPages(menus: Menu[]): Menu[] {

	const roots = menus.filter(({ pid }) => pid === 0)
	const children = menus.filter(({ pid }) => pid != 0)

	const toTree = (menus: Menu[], pMenu: Menu): Menu => {
		const children: Menu[] = []

		// todo: 拼接url
		for (const menu of menus) {
			if (menu.pid !== pMenu.id) {
				continue
			}
			children.push(toTree(children, menu))
		}

		if (children.length > 0) {
			return { ...pMenu, children }
		}

		return pMenu
	}

	return roots.map(root => toTree(children, root))

}

export const usePermission = (): [{ roles: Role[], pages: Page[], permissions: Permission[] }, (user: UserResponse) => void] => {
	const [roles, setRole] = useAtom(rolesAtom)
	const [pages, setPages] = useAtom(pagesAtom)
	const [pres, setPres] = useAtom(permissionsAtom)

	const setPermissions = (user: UserResponse) => {
		const { permissions } = user
		setRole(user.roles)
		setPres(permissions)

		const menuItems: Menu[] = permissions.reduce((result, permission) => {
			const items = permission.pages.filter(item => !result.find(i => i.id === item.id));
			return [...result, ...items];
		}, []);

		const pages = buildPages(menuItems)

		setPages(pages)
	}

	return [{ roles, pages, permissions: pres }, setPermissions]
}
