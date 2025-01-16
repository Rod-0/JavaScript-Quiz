import './App.css'
import { Game } from './components/Game'
import { JavaScriptLogo } from './components/JavaScriptLogo'
import { Start } from './components/start'
import { useQuestions } from './store/questions'

function App() {
  const questions = useQuestions((state) => state.questions)
  console.log(questions)
  return (
    <main >
      
        
      <div className='flex flex-col items-center justify-center h-screen gap-2 '>
        <JavaScriptLogo />
        <h1 className='text-3xl '>JavaScript Quizz</h1>
     

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

      </div>
        
      
      
      
    
    </main>
  )
}

export default App
