/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../../db/client'

export async function seedCitites() {
  const db = useTurso()

  try {
    // const cities = await import('./data/cities.json') as any
    const cities: any = {}
    const data = Object.keys(cities).map((key) => ({ ...cities[key] })).filter((c) => c.states && c.id)
    const count = await db.city.count()

    if (count === 0) {
      for (const country of data) {
        for (const state of country.states) {
          for (const city of state.cities) {
            city.stateId = state.id

            await db.city.upsert({
              where: { id: city.id },
              create: city,
              update: city,
            })
          }
        }
      }
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}
