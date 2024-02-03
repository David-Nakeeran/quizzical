import { useState, useEffect } from 'react';
import Start from './Start';
import Quiz from './Quiz';
'use strict';

function App() {
  

  function startQuiz() {
    setIsQuizAlive(prevState => !prevState)
  }
  
  const [isQuizAlive, setIsQuizAlive] = useState(false);

  return (
    <main className='container'>
      {isQuizAlive ? <Quiz /> : <Start startQuiz={() => startQuiz()}/>}
      
    </main>
  )
}

export default App
