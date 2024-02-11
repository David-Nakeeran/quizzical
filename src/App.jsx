import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {decode} from 'html-entities';
import Start from './components/Start';
import Quiz from './components/Quiz';
'use strict';

function App() {
  const [isQuizAlive, setIsQuizAlive] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [showAnswers, setshowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [playAgain, setPlayAgain] = useState(Date.now());

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

    async function getData() {
        try {
            const res = await fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');

            if(!res.ok) {
                throw Error(res.status)
            }
            const data = await res.json();
            
            setQuiz(data.results.map(item => {
                
                return {
                    id: uuidv4(),
                    question: decode(item.question),
                    correctAnswer: decode(item.correct_answer),
                    answers: createAnswersArray(item.incorrect_answers, item.correct_answer),
                    selectedAnswer: "",
                    showCorrectAnswers: false

                };
            }));
        }   catch(error) {
            console.error(error);
            return [];
        };   
    };


        useEffect(() => {
            const abortController = new AbortController();
            getData();
            return () => abortController.abort();
        }, [playAgain]);

        
    function handleChange(e) {
        const {value, name} = e.target;
        setQuiz(prevState => {
            return prevState.map(item => {
                if(name === item.id) {
                    return {
                        ...item, selectedAnswer: `${value}`,
                        selected: true
                    };
                } else {
                    return {...item, selected: false};
                };
            });
        });  
    };

    function showCorrectAnswers(e) {
        e.preventDefault();
        calculateScore();
        setQuiz(prevState => {
            return prevState.map(item => {
                if(item.answers.includes(item.correctAnswer)) {
                    return {
                        ...item,
                        showCorrectAnswers: true
                    };
                } else {
                    return item;
                };
            });
        });
      setshowAnswers(true);  
    };

    function calculateScore() {
        for(const item of quiz) {
            if(item.selectedAnswer === item.correctAnswer) {
                setScore(prevState => prevState + 1);
            };
        }; 
    };

    function newQuiz() {
        setPlayAgain(Date.now())
    }

    function resetQuiz(e) {
        e.preventDefault();
        setshowAnswers(false);
        newQuiz();
        setScore(0);
        startQuiz();
    };

  return (
    <main className='container'>
      {isQuizAlive ? 
      <div><Quiz quiz={quiz}
       selectAnswer={ handleChange} 
       checkAnswers={showCorrectAnswers} 
       showAnswers={showAnswers}
       score={score}
       resetQuiz={resetQuiz}
       /></div> : <Start startQuiz={() => startQuiz()}/>}
      
    </main>
  )
}

export default App
