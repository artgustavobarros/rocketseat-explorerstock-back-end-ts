import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InPrismaProductsRepository } from '../../../repositories/in-prisma/in-prisma-products-repository'
import { CreateProductUseCase } from '../../../use-cases/create'

export const registerProduct = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const bodySchema = z.object({
    name: z.string(),
    price: z.string(),
  })

  const { name, price } = bodySchema.parse(request.body)

  try {
    const repository = new InPrismaProductsRepository()
    const useCase = new CreateProductUseCase(repository)

    const { product } = await useCase.execute({ name, price })
    reply.status(201).send({ product })
  } catch (err) {
    return reply.status(400).send({ message: 'Cant register this product.' })
  }
}
