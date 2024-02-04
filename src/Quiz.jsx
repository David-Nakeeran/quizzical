import { v4 as uuidv4 } from 'uuid';

export default function Quiz(props) {

const answers = props.answers.map((answer,index) => {
    
    return <div key={uuidv4()}>
                <input
                type="radio"
                value={answer}
                name={`${props.id}`}
                id={`${props.id}-${index}`}
                />
                <label htmlFor={`${props.id}-${index}`}>{answer}</label>
            </div>
})

    return (
        <div className="quiz-container">
            <h4>{props.question}</h4>
            <form>
                {answers}
            </form>
        </div>
    )
}