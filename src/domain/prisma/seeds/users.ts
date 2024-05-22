import { faker } from '@faker-js/faker'

import { SECRET_KEY } from '../../constants/env'
import { useTurso } from '../../db/client'
import { hashPassword } from '../../utils/crypto/encoder'

export async function seedUsers() {
  const db = useTurso()

  const documentTypes = ['ID', 'PASSPORT', 'DRIVER', 'OTHER']
  const birthRange: any = { min: 18, max: 65, mode: 'age' }

  const generateInfo = () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatar: faker.image.avatar(),
    gender: faker.person.sex(),
    dateOfBirth: faker.date.birthdate(birthRange),
    phoneNumber: faker.phone.number(),
    documentType: faker.helpers.arrayElement(documentTypes),
    documentNumber: faker.string.numeric(10),
    address: faker.location.streetAddress(),
  })

  try {
    const adminRole = await db.role.findFirst({ where: { name: 'admin' } })
    const memberRole = await db.role.findFirst({ where: { name: 'member' } })

    const users: any = [
      {
        username: 'admin',
        email: 'admin@localhost',
        secretKey: SECRET_KEY as string,
        password: hashPassword('admin123'),
        roles: { connect: { id: adminRole?.id } },
        info: { create: generateInfo() },
      }, {
        username: 'demo',
        email: 'demo@localhost',
        secretKey: SECRET_KEY as string,
        password: hashPassword('demo123'),
        roles: { connect: { id: memberRole?.id } },
        info: { create: generateInfo() },
      },
    ]

    for (let i = 0; i < 25; i++) {
      users.push({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        secretKey: SECRET_KEY as string,
        password: hashPassword(faker.internet.password()),
        roles: { connect: { id: memberRole?.id } },
        info: { create: generateInfo() },
      })
    }

    for (const data of users) {
      await db.user.upsert({
        where: { email: data.email },
        create: data,
        update: data,
        include: {
          roles: true,
          info: true,
        },
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
}
