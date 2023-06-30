import { generateFromPassword } from '../lib/password'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Admin',
    email: '123456789@qq.io',
    phone: '12345678901',
    password: generateFromPassword('123456'),
    Roles: {
      create: [
        {
          role: {
            create: {
              Title: '超级管理员',
              Pid: 0,
              permissions: {
                create: [
                  {
                    permission: {
                      create: {
                        name: "超级权限",
                        menus: {
                          create: [
                            { path: "index", pid: 0, title: "控制台", icon: 'i-tabler-3d-cube-sphere', description: "后台管理的首页 一般为控制台" },
                            { path: "user", pid: 0, title: "用户中心", icon: 'i-tabler-users', description: "用户中心" },
                            { path: "index", pid: 2, title: "用户管理", icon: 'i-tabler-user-cog', description: "用户管理的默认页面" },
                          ]
                        },
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        {
          role: {
            create: {
              Title: '普通管理员',
              Pid: 1,
            }
          }
        }
      ]
    }
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
      include: {
        Roles: true
      }
    })
    console.log(`Created user with id: ${user.id}`)
  }
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
