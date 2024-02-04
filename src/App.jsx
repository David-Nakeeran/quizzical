import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {decode} from 'html-entities';
import Start from './Start';
import Quiz from './Quiz';
'use strict';

function App() {
  const [isQuizAlive, setIsQuizAlive] = useState(false);

  const [quizData, setQuizData] = useState([]);

  function startQuiz() {
    setIsQuizAlive(prevState => !prevState);
  };

  function createAnswersArray(arr, correctAnsw) {
        const incorrectAnswers = arr.map(item => {
             return decode(item)
        });

        const correctAnswer = decode(correctAnsw)
        
        const answersArr =  [...incorrectAnswers, correctAnswer];
        
        return shuffleArray(answersArr)
    };

    function shuffleArray(arr) {
        for(let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];

        };
        return arr;
    };

    useEffect(() => {
        
        const abortController = new AbortController();

        async function getData() {
            try {
                const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');

                if(!res.ok) {
                    throw Error(res.status)
                }
                const data = await res.json();
                
                setQuizData(data.results.map(item => {
                    
                    return {
                        id: uuidv4(),
                        question: decode(item.question),
                        correctAnswer: decode(item.correct_answer),
                        answers: createAnswersArray(item.incorrect_answers, item.correct_answer)

                    };
                }));
            }   catch(error) {
                console.error(error);
            };   
        };
        getData()
        return () => abortController.abort();
    }, []);
        

  const quiz = quizData.map(item => (
    <Quiz
      key={item.id}
      id={item.id}
      question={item.question}
      correctAnswer={item.correctAnswer}
      answers={item.answers}
    />
  ))
 
  
  return (
    <main className='container'>
      {isQuizAlive ? <div>{quiz}</div> : <Start startQuiz={() => startQuiz()}/>}
      
    </main>
  )
}

export default App
