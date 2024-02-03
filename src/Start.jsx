

export default function Start(props) {
    return (
        <div className='start-quiz'>
        <h1>Quizzical</h1>
        <button
        onClick={props.startQuiz}
        >Start quiz</button>
      </div>
    )
}