import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answers-comments-repository'

interface FetchAnswersCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswersCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswersCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return {
      answerComments,
    }
  }
}
