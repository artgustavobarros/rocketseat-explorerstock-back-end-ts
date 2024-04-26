import { FastifyReply, FastifyRequest } from 'fastify'
import { InPrismaProductsRepository } from '../../../repositories/in-prisma/in-prisma-products-repository'
import { FetchAllProductsUseCase } from '../../../use-cases/fetch'

export const fetchAllProducts = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const repository = new InPrismaProductsRepository()
    const useCase = new FetchAllProductsUseCase(repository)

    const { products } = await useCase.execute()

    reply.status(201).send({ products })
  } catch (err) {
    return reply.status(400).send({ message: "Can't find any product." })
  }
}
