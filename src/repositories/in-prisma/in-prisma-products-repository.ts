import { Prisma } from '@prisma/client'
import prisma from '../../lib/prisma'
import { ProductsRepositoryProps } from '../@types/products-repository'

export class InPrismaProductsRepository implements ProductsRepositoryProps {
  async create(data: Prisma.ProductCreateInput) {
    const product = await prisma.product.create({ data })

    return product
  }

  async index() {
    const products = await prisma.product.findMany()

    if (!products) {
      return null
    }

    return products
  }
}
