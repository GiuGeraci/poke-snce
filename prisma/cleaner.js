const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const tablesWithId = ['ability', 'type', 'pokemon', 'team', 'trainer']
const tablesWithCompositeKey = ['pokemon_ability', 'pokemon_type']

async function deleteTableRecords(table) {
  await prisma[table].deleteMany()
  console.log(`Deleted records in ${table} table`)
}

async function deleteAllRecords(tables) {
  await Promise.all(tables.map((table) => deleteTableRecords(table)))
}

async function resetAutoIncrement(tables) {
  Promise.all(
    tables.map(async (tableName) => {
      await prisma.$executeRawUnsafe(
        `ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH 1;`
      )

      console.log(`Reset ${tableName} auto increment to 1`)
    })
  )
}

const load = async () => {
  try {
    await deleteAllRecords([...tablesWithCompositeKey, ...tablesWithId])
    await resetAutoIncrement(tablesWithId)
    const trainer = {
      username: 'Giuliano',
      gender: 'male',
      status: 'active',
    }
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
