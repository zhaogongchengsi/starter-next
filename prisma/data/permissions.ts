import { PrismaClient, Menu, Permission } from "@prisma/client";

export async function createPermissions(prisma: PrismaClient, menus: Menu[]): Promise<Permission[]> {

	const role = await prisma.permission.create({
		data: {
			name: "超级权限",
			description: "超级管理员"
		},
	})

	console.log(`创建权限 id: ${role.id} name: ${role.name}`)

	await prisma.permission.update({
		where: {
			id: role.id
		},
		data: {
			menus: {
				connect: menus.map(i => ({ id: i.id }))
			}
		}
	})

	console.log(`将 ${menus.map(i => `${i.id}-${i.title}`).join(',')} 菜单关联到权限 ${role.name}`)

	return [role] as Permission[]

}