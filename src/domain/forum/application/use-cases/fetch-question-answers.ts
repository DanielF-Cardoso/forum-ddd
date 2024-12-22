import { AnswerRepository } from '../repositories/answers-repository'
import { Answer } from '../../enterprise/entities/answer'

interface FetchQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return {
      answers,
    }
  }
}
