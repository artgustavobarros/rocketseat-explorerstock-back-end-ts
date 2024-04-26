import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryProductsRepository } from '../repositories/in-memory/in-memory-products-repository'
import { FetchAllProductsUseCase } from './fetch'

let useCase: InMemoryProductsRepository
let sut: FetchAllProductsUseCase

describe('Create Product Use Cases Tests', () => {
  beforeEach(() => {
    useCase = new InMemoryProductsRepository()
    sut = new FetchAllProductsUseCase(useCase)
  })

  it('should be able to register a new product', async () => {
    for (let i = 0; i < 5; i++) {
      await useCase.create({
        name: `product ${i}`,
        price: '0',
      })
    }

    const { products } = await sut.execute()

    expect(products).toHaveLength(5)
  })
})
