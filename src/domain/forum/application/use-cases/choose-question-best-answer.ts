import { Question } from '../../enterprise/entities/question'
import { AnswerRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findByID(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findByID(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('You are not allowed to choose the best answer')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
