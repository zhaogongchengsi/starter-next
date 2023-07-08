import { Prisma, PrismaClient, Permission, Role } from "@prisma/client";

export const roleData: Prisma.RoleCreateInput[] = [
	{
		Title: '超级管理员',
		Pid: 0,
		permissions: {
			connect: [
				{
					roleId_permissionId: {
						roleId: 0,
						permissionId: 0,
					}
				}
			]
		}
	},
	{
		Title: '普通管理员',
		Pid: 1,
	}
]


export async function createRoles(prisma: PrismaClient): Promise<Role> {
	const role = await prisma.role.create({
		data: {
			Title: '超级管理员',
			Pid: 0,
		},
	})

	console.log(`创建角色 ${role.Title}`)

	return role
}

export async function createRoleWithPermissions(prisma: PrismaClient, { role, permissions }: { role: Role, permissions: Permission[] }) {

	return await prisma.rolePermission.createMany({
		data: permissions.map(i => {
			return {
				permissionId: i.id,
				roleId: role.id
			}
		})
	})

}