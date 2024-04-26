import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import SessionUserUseCase from './sessions'
import { hash } from 'bcryptjs'
import InvalidUsersCredentialsError from './errors/invalid-user-credentials-error'

let useCase: InMemoryUsersRepository
let sut: SessionUserUseCase

describe('Sessions User Use Case', () => {
  beforeEach(() => {
    useCase = new InMemoryUsersRepository()
    sut = new SessionUserUseCase(useCase)
  })

  it('should be able authenticate a user', async () => {
    await useCase.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    await useCase.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'wrong_email.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidUsersCredentialsError)
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    await useCase.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
    })

    expect(async () => {
      await sut.execute({
        email: 'johndoe@email.com',
        password: 'wrong_password',
      })
    }).rejects.toBeInstanceOf(InvalidUsersCredentialsError)
  })
})
