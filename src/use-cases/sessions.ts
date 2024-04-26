import { User } from '@prisma/client'
import { UsersRepositoryProps } from '../repositories/@types/users-repository'
import InvalidUsersCredentialsError from './errors/invalid-user-credentials-error'
import { compare } from 'bcryptjs'

interface SessionUserUseCaseRequest {
  email: string
  password: string
}

interface SessionUserUseCaseReply {
  user: User
}

class SessionUserUseCase {
  constructor(private usersRepository: UsersRepositoryProps) {}

  async execute({
    email,
    password,
  }: SessionUserUseCaseRequest): Promise<SessionUserUseCaseReply> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidUsersCredentialsError()
    }

    const passwordMatches = await compare(password, user.password)

    if (!passwordMatches) {
      throw new InvalidUsersCredentialsError()
    }

    return { user }
  }
}

export default SessionUserUseCase
