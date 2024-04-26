import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { CreateProductUseCase } from './create'

let useCase: InMemoryProductsRepository
let sut: CreateProductUseCase

describe('Create Product Use Cases Tests', () => {
  beforeEach(() => {
    useCase = new InMemoryProductsRepository()
    sut = new CreateProductUseCase(useCase)
  })

  it('should be able to register a new product', async () => {
    const { product } = await sut.execute({
      name: 'new_product',
      price: '2',
    })

    expect(product.id).toEqual(expect.any(String))
  })
})
