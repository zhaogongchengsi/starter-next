import { Prisma, PrismaClient, Role, User } from '@prisma/client'
import { generateFromPassword } from '../../lib/password'

export async function createUser(prisma: PrismaClient) {
	const pws = generateFromPassword('123456')

	const user = await prisma.user.create({
		data: {
			name: 'Admin',
			email: '123456789@qq.io',
			phone: '12345678901',
			password: pws,
		},
	})

	console.log(`Password: 123456`)


	return user
}


export async function createUserWithRoles(prisma: PrismaClient, { user, roles }: { user: User, roles: Role[] }) {

	return prisma.userRole.createMany({
		data: roles.map(i => {
			return {
				userId: user.id,
				roleId: i.id
			}
		})
	})

}