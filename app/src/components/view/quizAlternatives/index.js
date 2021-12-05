import './quizAlternatives.css'

export default function QuizAlternativesView(props) {
    return (
        <div className={'quizAlternatives grid-container'}>
            {props.alternatives.map((name, index) => {
                return (<div 
                    key={name}
                    onClick={e => props.onGuess(name, index)}
                    className={`${props.answerClasses[index]} grid-item`}>
                        {name}
                        </div>);
            })}
        </div>
    )
}