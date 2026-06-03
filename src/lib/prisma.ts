import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { __prisma: PrismaClient | undefined }

function createPrismaClient() {
const pool = new Pool({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false },
connectionTimeoutMillis: 10000,
})
const adapter = new PrismaPg(pool)
return new PrismaClient({ adapter })
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
prisma = createPrismaClient()
} else {
if (!globalForPrisma.__prisma) {
globalForPrisma.__prisma = createPrismaClient()
}
prisma = globalForPrisma.__prisma
}

export { prisma }
