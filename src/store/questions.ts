import {create} from 'zustand'
import { type Question } from '../types'
import { persist } from 'zustand/middleware'

interface State {
    questions: Question[]
    currentQuestionIndex: number
    fetchQuestions: (limit:number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex:number) => void
    goNextQuestion: () => void
    goPreviosQuestion: () => void
    reset: () => void
}

export const useQuestions = create<State>()(persist((set, get) => ({
    questions: [],
    currentQuestionIndex: 0,
    fetchQuestions: async (limit:number) => {
        const res = await fetch('https://rod-0.github.io/ApiJson/data.json')
        const data = await res.json()

        console.log(data)

        const questions = data['questions'].sort(() => Math.random() - 0.5).slice(0, limit)
        set({questions})
    },
    selectAnswer: (questionId, answerIndex) => {
        const {questions} = get()
        const newQuestions = structuredClone(questions)

        const questionIndex = newQuestions.findIndex((question) => question.id === questionId)
        const questionInfo = newQuestions[questionIndex]
        const isCorrectAnswer = questionInfo.correctAnswer === answerIndex 

        newQuestions[questionIndex] = {...questionInfo, isCorrectAnswer, userSelectedAnswer: answerIndex}

        set({questions: newQuestions})
    },
    goNextQuestion: () => {
        const {questions, currentQuestionIndex} = get()
        const newQuestionIndex = currentQuestionIndex + 1
        if(newQuestionIndex < questions.length){
            set({currentQuestionIndex: newQuestionIndex})
        }
    },
    goPreviosQuestion: () => {
        const {currentQuestionIndex} = get()
        const newQuestionIndex = currentQuestionIndex - 1
        if(newQuestionIndex >= 0){
            set({currentQuestionIndex: newQuestionIndex})
        }
    },
    reset: () => {
        set({currentQuestionIndex: 0, questions: []})
    }
}), { name: 'questions' }))