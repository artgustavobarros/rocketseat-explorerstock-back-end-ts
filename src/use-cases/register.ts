import { hash } from 'bcryptjs'
import { UsersRepositoryProps } from '../repositories/@types/users-repository'
import { User } from '@prisma/client'
import UserAlreadyExistsError from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserUseCaseReply {
  user: User
}

class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepositoryProps) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseReply> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
    })

    return { user }
  }
}

export default RegisterUserUseCase
