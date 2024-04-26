import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import UserAlreadyExistsError from './errors/user-already-exists-error'
import RegisterUserUseCase from './register'

let useCase: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use Cases Tests', () => {
  beforeEach(() => {
    useCase = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(useCase)
  })

  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register two users with same email', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      name: 'First User',
      email,
      password: '123456',
    })

    expect(async () => {
      await sut.execute({
        name: 'Second User',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to hash a password', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordHashed = await compare('123456', user.password)

    expect(isPasswordHashed).toBe(true)
  })
})
