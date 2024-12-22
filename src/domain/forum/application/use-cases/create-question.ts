import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface CreateQuestioUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestioUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId),
    })

    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
