import { Prisma, PrismaClient, Menu } from "@prisma/client";

export const menus: Prisma.MenuCreateInput[] = [
	{ path: "/admin", pid: 0, title: "控制台", icon: 'i-tabler-3d-cube-sphere', description: "后台管理的首页 一般为控制台" },
	{ path: "/admin/user", pid: 0, title: "用户中心", icon: 'i-tabler-users', description: "用户中心" },
	{ path: "/admin/user", pid: 2, title: "用户管理", icon: 'i-tabler-user-cog', description: "用户管理的默认页面" },
	{ path: "/admin/authority", pid: 2, title: "权限管理", icon: 'i-tabler-user-cog', description: "权限管理" },
	{ path: "/admin/article", pid: 0, title: "文章管理", icon: 'i-tabler-apps-filled', description: "文章管理" },
	{ path: "/admin/article", pid: 5, title: "文章管理", icon: 'i-tabler-article', description: "文章管理的默认页面" },
	{ path: "/admin/article/publish", pid: 5, title: "发布文章", icon: 'i-tabler-ballpen', description: "发布文章" },
	{ path: "/admin/material/", pid: 0, title: "素材管理", icon: 'i-tabler-brand-pinterest', description: "发布文章" },
	{ path: "/admin/material/image", pid: 8, title: "图片管理", icon: 'i-tabler-photo-heart', description: "发布文章" },
	{ path: "/admin/material/video", pid: 8, title: "视频管理", icon: 'i-tabler-brand-youtube', description: "发布文章" },
]

export async function createMenu(prisma: PrismaClient) {
	const menuArr: Menu[] = []
	for (const m of menus) {
		const menu = await prisma.menu.create({
			data: m,
		})
		menuArr.push(menu)
	}

	console.log(`创建菜单 -> ${menuArr.map(m => { return `${m.id}-${m.title}` }).join(',')}`)

	return menuArr
}