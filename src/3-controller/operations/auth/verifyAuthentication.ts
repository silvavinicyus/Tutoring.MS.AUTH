import { IAuthorizer } from '@business/dto/role/authorize'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { verify } from 'jsonwebtoken'
import { AbstractOperator } from '../abstractOperator'

type IOutputVerifyAuthentication = Either<IError, IAuthorizer>

interface IPayload {
  sub: string
}

@injectable()
export class VerifyAuthenticationOperator extends AbstractOperator<
  { bearer: string },
  IOutputVerifyAuthentication
> {
  constructor(
    @inject(FindStudentByUuidUseCase)
    private findStudent: FindStudentByUuidUseCase
  ) {
    super()
  }

  async run(input: { bearer: string }): Promise<IOutputVerifyAuthentication> {
    const { sub: user_uuid } = verify(
      input.bearer,
      process.env.SECRET_TOKEN
    ) as IPayload

    const user = await this.findStudent.exec({ uuid: user_uuid })

    if (user.isLeft()) {
      return left(user.value)
    }

    const authorizer: IAuthorizer = {
      user: user.value,
      role: '',
    }

    return right(authorizer)
  }
}