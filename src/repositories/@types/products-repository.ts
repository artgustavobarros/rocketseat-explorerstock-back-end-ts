import { Prisma, Product } from '@prisma/client'

export interface ProductsRepositoryProps {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  index(): Promise<Product[] | null>
}
