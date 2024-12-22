import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findByID(answerId)

    if (!answer) {
      throw new Error('answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not allowed to delete this answer')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
