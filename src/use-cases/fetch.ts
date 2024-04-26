import { Product } from '@prisma/client'
import { ProductsRepositoryProps } from '../repositories/@types/products-repository'

interface FetchAllProductsReply {
  products: Product[]
}

export class FetchAllProductsUseCase {
  constructor(private productRepository: ProductsRepositoryProps) {}

  async execute(): Promise<FetchAllProductsReply> {
    const products = await this.productRepository.index()

    return { products }
  }
}
