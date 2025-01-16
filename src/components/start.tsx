import { useQuestions } from "../store/questions"

export const Start = () => {
    const fetchQuestions = useQuestions((state) => state.fetchQuestions)
    const handleClick = () => {
        fetchQuestions(10)
    }

    return (
        <button onClick= {handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            !Start
        </button>
    )
    
}