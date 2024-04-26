import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InPrismaUsersRepository } from '../../../repositories/in-prisma/in-prisma-users-repository'
import SessionUserUseCase from '../../../use-cases/sessions'
import InvalidUsersCredentialsError from '../../../use-cases/errors/invalid-user-credentials-error'

export const sessionsUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const requestBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  try {
    const repository = new InPrismaUsersRepository()
    const useCase = new SessionUserUseCase(repository)

    const { user } = await useCase.execute({ email, password })

    const token = await reply.jwtSign({}, { sign: { sub: user.id } })

    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: user.id, expiresIn: '7d' } },
    )

    reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ user, token })
  } catch (err) {
    if (err instanceof InvalidUsersCredentialsError) {
      reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
