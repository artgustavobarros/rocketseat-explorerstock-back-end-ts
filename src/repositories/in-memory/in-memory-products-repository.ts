import { Prisma, Product } from '@prisma/client'
import { ProductsRepositoryProps } from '../@types/products-repository'
import { randomUUID } from 'crypto'

export class InMemoryProductsRepository implements ProductsRepositoryProps {
  public items: Product[] = []

  async create(data: Prisma.ProductCreateInput) {
    const product = {
      id: randomUUID(),
      name: data.name,
      price: data.price,
    }

    this.items.push(product)

    return product
  }

  async index(): Promise<{ id: string; name: string; price: string }[]> {
    return this.items
  }
}
