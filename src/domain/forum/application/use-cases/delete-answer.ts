import { AnswerRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const question = await this.answersRepository.findByID(answerId)

    if (!question) {
      throw new Error('Answer not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You are not allowed to delete this answer')
    }

    await this.answersRepository.delete(question)

    return {}
  }
}
