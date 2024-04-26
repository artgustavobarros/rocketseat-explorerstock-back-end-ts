import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InPrismaUsersRepository } from '../../../repositories/in-prisma/in-prisma-users-repository'
import RegisterUserUseCase from '../../../use-cases/register'
import UserAlreadyExistsError from '../../../use-cases/errors/user-already-exists-error'

export const registerUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const { name, email, password } = bodySchema.parse(request.body)

  try {
    const repository = new InPrismaUsersRepository()
    const useCase = new RegisterUserUseCase(repository)

    const { user } = await useCase.execute({ name, email, password })
    reply.status(201).send({ user })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      reply.status(400).send({ message: err.message })
    throw err
  }
}
