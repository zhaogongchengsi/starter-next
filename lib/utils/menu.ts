
export function buildPages(menus: Menu[]): Menu[] {

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