/* eslint-disable react-hooks/rules-of-hooks */
import { useTurso } from '../../db/client'

export async function seedStates() {
  const db = useTurso()

  try {
    // const states = await import('./data/states.json') as any
    const states: any = {}
    const data = Object.keys(states).map((key) => ({ ...states[key] })).filter((c) => c.states && c.id)
    const count = await db.state.count()

    if (count === 0) {
      for (const country of data) {
        for (const state of country.states) {
          state.countryId = country.id

          await db.state.upsert({
            where: { id: state.id },
            create: state,
            update: state,
          })
        }
      }
    }
  } catch (error: any) {
    console.error(error)
  } finally {
    db.$disconnect()
  }
}
