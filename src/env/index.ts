import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
})

const envServer = envSchema.safeParse(process.env)

if (!envServer.success) {
  console.error(envServer.error.issues)
  throw new Error('There is an error with the server environment variables')
}

const env = envServer.data

export default env
