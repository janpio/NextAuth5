import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const db = globalThis.prisma || new PrismaClient({ adapter, log: ['query']});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
