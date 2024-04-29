import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyUsersRole } from '../middlewares/verify-role'

export const salesRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/sales',
    { preHandler: verifyUsersRole(['ADMIN', 'SALE']) },
    async (request, reply) => {
      const sales = ['Venda 1', 'Venda 2', 'Venda 3']
      reply.send({ sales })
    },
  )
}
