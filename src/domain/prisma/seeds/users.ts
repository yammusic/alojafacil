/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../../db/client'
import { hashPassword } from '../../utils/crypto/encoder'

export async function seedUsers() {
  const db = useTurso()

  try {
    const adminRole = await db.role.findFirst({ where: { name: 'admin' } })
    const memberRole = await db.role.findFirst({ where: { name: 'member' } })

    const users = [
      {
        username: 'admin',
        email: 'admin@localhost',
        secretKey: process.env.SECRET_KEY as string,
        password: hashPassword('admin123'),
        roles: { connect: { id: adminRole?.id } },
      }, {
        username: 'member',
        email: 'member@localhost',
        secretKey: process.env.SECRET_KEY as string,
        password: hashPassword('member123'),
        roles: { connect: { id: memberRole?.id } },
      },
    ]

    for (const data of users) {
      await db.user.upsert({
        where: { email: data.email },
        create: data,
        update: data,
        include: { roles: true },
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
}
