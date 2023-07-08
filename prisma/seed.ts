import { PrismaClient } from '@prisma/client'
import { createMenu } from './data/menus'
import { createPermissions } from './data/permissions'
import { createRoleWithPermissions, createRoles } from './data/role'
import { createUser, createUserWithRoles } from './data/user'

const prisma = new PrismaClient()


async function main() {
  console.log(`Start seeding ...`)

  const menus = await createMenu(prisma)

  const permissions = await createPermissions(prisma, menus)

  const role = await createRoles(prisma)

  const user = await createUser(prisma)


  console.log('开始创建关系...')

  await createRoleWithPermissions(prisma, { role, permissions })

  await createUserWithRoles(prisma, { user, roles: [role] })

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
