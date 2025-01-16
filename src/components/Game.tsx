import { useQuestions } from "../store/questions"
import { Question } from "../types"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Footer } from "./Footer"

const _Question = ({info}:{info : Question}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const selectAnswer = useQuestions((state) => state.selectAnswer)
    const handleClick = (answerIndex:number) => {
        selectAnswer(info.id, answerIndex)
    }
    const getBakgroundColor = (index:number) => {
        if(info.userSelectedAnswer == null) return 'bg-blue-500'
        if(info.correctAnswer !== index && info.userSelectedAnswer !== index) return 'bg-blue-500'
        if(info.correctAnswer ===index) return 'bg-green-500'
        if(info.userSelectedAnswer === index ) return 'bg-red-500'

        return 'bg-blue-500'
       
    }
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 w-auto" >
            <h2 className="text-2xl">{info.question}</h2>
            <SyntaxHighlighter language="javascript" style={agate} wrapLongLines={true} className="w-auto text-left p-2">
                {info.code}
            </SyntaxHighlighter>
            <div className="flex flex-col gap-2">
                {info.answers.map((answer, index) => (
                  
                    <button key={index} disabled ={ info.userSelectedAnswer != null}  onClick={() => handleClick(index)} className= {`text-white font-bold py-2 px-4 rounded ${getBakgroundColor(index)}`}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    )
}

export const Game = () => {
    const questions = useQuestions((state) => state.questions)
    const currentQuestionIndex = useQuestions((state) => state.currentQuestionIndex)
    const goNextQuestion = useQuestions((state) => state.goNextQuestion)
    const goPreviosQuestion = useQuestions((state) => state.goPreviosQuestion)
    
    const questionInfo = questions[currentQuestionIndex]

    return (
        <>
            <div className="flex justify-between p-4 gap-3">
                <button onClick={goPreviosQuestion} disabled = {currentQuestionIndex == 0} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Previous</button>
                <h2>{currentQuestionIndex + 1}/{questions.length}</h2>
                <button onClick={goNextQuestion} disabled = {currentQuestionIndex >= questions.length - 1 } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
            </div>
        <_Question info={questionInfo} />   

        <Footer />     
        </>
    )

} 