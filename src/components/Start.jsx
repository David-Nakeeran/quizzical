

export default function Start(props) {
    return (
      <div className='start-quiz'>
        <h1>Quizzical</h1>
        <button
        onClick={props.startQuiz}
        className="start-quiz-btn"
        >Start quiz</button>
      </div>
    )
}