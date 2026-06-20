import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// prisma generate does not connect to the database — a placeholder is fine at install/build time
const databaseUrl =
  process.env.DATABASE_URL ??
  'postgresql://postgres:postgres@localhost:5432/moneymesh?schema=public';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: databaseUrl,
  },
});
