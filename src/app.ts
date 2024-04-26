import fastify from 'fastify'
import { ZodError } from 'zod'
import env from './env'
import { usersRoutes } from './http/routes/users-routes'
import { productsRoutes } from './http/routes/products-routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { verifyJWT } from './http/middlewares/verify-jwt'
import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {})

app.register(fastifyJwt, {
  secret: 'explorerstock',
  sign: { expiresIn: '1d' },
  cookie: { cookieName: 'refreshToken', signed: false },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(productsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.get('/ping', async (request, reply) => {
  reply.send({ message: 'pong' })
})

app.get('/sales', { preHandler: verifyJWT }, async (request, reply) => {
  const sales = ['Venda 1', 'Venda 2', 'Venda 3']
  reply.send({ sales })
})
