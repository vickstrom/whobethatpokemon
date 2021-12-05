import './quizAlternatives.css'

export default function QuizAlternativesView(props) {
    return (
        <div className={'quizAlternatives grid-container'}>
            {props.alternatives.map((name, index) => {
                return (<div 
                    key={name}
                    onClick={e => props.onGuess(name, index)}
                    style={{'backgroundColor': props.alternativesColors[index]}}
                    className={'grid-item'}>
                        {name}
                        </div>);
            })}
        </div>
    )
}