/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../../db/client'

export async function seedCountries() {
  const db = useTurso()

  try {
    const countries = await import('./data/countries.json') as any
    const data = Object.keys(countries).map((key) => ({ ...countries[key] })).filter((c) => c.name && c.id)
    const count = await db.country.count()

    if (count === 0) {
      for (const country of data) {
        await db.country.upsert({
          where: { id: country.id },
          create: country,
          update: country,
        })
      }
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}
