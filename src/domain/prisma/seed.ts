import { seedCitites } from './seeds/cities'
import { seedCountries } from './seeds/countries'
import { seedRoles } from './seeds/roles'
import { seedStates } from './seeds/states'
import { seedUsers } from './seeds/users'

async function seed() {
  console.log('Starting seeding...')

  await seedCountries()
  console.log('Countries seeded!')

  await seedStates()
  console.log('States seeded!')

  await seedCitites()
  console.log('Cities seeded!')

  await seedRoles()
  console.log('Roles seeded!')

  await seedUsers()
  console.log('Users seeded!')

  console.log('Database seeded!')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
