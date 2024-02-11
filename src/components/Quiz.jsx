import { v4 as uuidv4 } from 'uuid';


export default function Quiz(props) {

function isAnswersSelected() {
    return props.quiz.every(item => item.selectedAnswer !== "");
};

const questionsAndAnswers = props.quiz.map((item) => {

    return  <div className="quiz-container" key={uuidv4()}>
                <h4>{item.question}</h4>
                <div className="answers-container" id={item.id}>
                    {item.answers.map((answer, index) => {

                        const isCorrect = answer === item.correctAnswer;
                        const isSelected = answer === item.selectedAnswer;
                        const isSelectedIncorrect = isSelected && !isCorrect

                        const labelStyle = props.showAnswers ? 
                        {
                            backgroundColor: isCorrect ? '#94d7a2' : isSelectedIncorrect ? '#f8bcbc' : '',
                            ...(isCorrect && {
                                border: 'none',
                                

                            }),
                            ...(isSelectedIncorrect && {
                                border: 'none',
                                opacity: '50%'
                            }),
                            
                        
                        } : {}
                        
                        

                        return <div className="testing" key={uuidv4()}>
                        <input
                        type="radio"
                        value={answer}
                        name={`${item.id}`}
                        onChange={props.selectAnswer}
                        checked={answer === item.selectedAnswer}
                        disabled={props.showAnswers}
                        id={`${item.id}-${index}`}
                        />
                        <label 
                        htmlFor={`${item.id}-${index}`}
                        style={labelStyle}
                        >{answer}
                        </label>
                        </div>
                    })}
                </div>
            </div>
})


    return (
        <div className='form-container'>
            <form>
                {questionsAndAnswers}
                <div className='btn-container'>
                    {props.showAnswers && <p>You scored {props.score}/{props.quiz.length} correct answers</p>}
                    {props.showAnswers ? <button type='submit' className="quiz-btn" onClick={props.resetQuiz}>Play again</button> : <button type='submit' className="quiz-btn" onClick={props.checkAnswers} disabled={!isAnswersSelected()}>Check answers</button>}
                </div>    
            </form>   
        </div>

        
    )
}