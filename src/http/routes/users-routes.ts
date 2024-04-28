import { FastifyInstance } from 'fastify'
import { registerUser } from '../controllers/users/register'
import { sessionsUser } from '../controllers/users/sessions'

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUser)
  app.post('/sessions', sessionsUser)
}
