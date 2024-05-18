/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../../db/client'

export async function seedRoles() {
  const db = useTurso()

  try {
    const roles = [
      { name: 'admin' },
      { name: 'member' },
    ]

    for (const data of roles) {
      await db.role.upsert({
        where: { name: data.name },
        create: data,
        update: data,
      })
    }
  } catch (error) {
    console.error(error)
  } finally {
    await db.$disconnect()
  }
}
