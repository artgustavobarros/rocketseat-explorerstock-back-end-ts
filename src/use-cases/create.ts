import { Product } from '@prisma/client'
import { ProductsRepositoryProps } from '../repositories/@types/products-repository'

interface CreateProductUseCaseRequest {
  name: string
  price: string
}

interface CreateProductUseCaseReply {
  product: Product
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductsRepositoryProps) {}

  async execute({
    name,
    price,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseReply> {
    const product = await this.productRepository.create({ name, price })

    return { product }
  }
}
