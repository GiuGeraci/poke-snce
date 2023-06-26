const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.trainer.create({
      data: trainer,
    })
    console.log(
      `Come on ${trainer.username}!! Hope you'll enjoy your new journey`
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
