import { FastifyReply, FastifyRequest } from 'fastify'

type Roles = 'ADMIN' | 'CUSTOMER' | 'SALE'

export const verifyUsersRole = (roleToVerify: Roles[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      return reply.status(401).send({ message: 'Unauthorized' })
    }
  }
}
