import { Prisma } from '@prisma/client'
import { UsersRepositoryProps } from '../@types/users-repository'
import prisma from '../../lib/prisma'

export class InPrismaUsersRepository implements UsersRepositoryProps {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return null
    }

    return user
  }
}
