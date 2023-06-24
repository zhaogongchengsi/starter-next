import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()


const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    phone: '123456',
    password: "123456",
    Roles: {
      create:[
        {
          role: {
            create: {
              Title:'超级管理员',
              Pid: 0,
            }
          }
        },
        {
          role: {
            create: {
              Title:'普通管理员',
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
