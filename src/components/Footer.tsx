import { useQuestionData } from "../hooks/useQuestionData"
import { useQuestions } from "../store/questions"


export const Footer = () => {
    const {correct, incorrect, unanswered} = useQuestionData()
    const reset = useQuestions(state => state.reset)

    return (
        <footer className=" text-black text-center p-4">
            
            <div className="flex justify-center gap-4">
                <div>
                    
                    <h3>✔️ {correct} correctos</h3>
                </div>
                <div>
                   
                    <h3>❌ {incorrect} incorrectos</h3>
                </div>
                <div>
                   
                    <h3>❓{unanswered} sin contestar</h3>
                </div>
            </div>
            <button onClick={() => {reset()}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Reset Game
            </button>
        </footer>
    )
}