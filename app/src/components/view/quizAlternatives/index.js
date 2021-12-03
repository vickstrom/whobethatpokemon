import './quizAlternatives.css'

export default function QuizAlternativesView(props) {
    return (
        <div className={'quizAlternatives grid-container'}>
            {props.alternatives.map(name => {
                return (<div className={'grid-item'}>{name}</div>);
            })}
        </div>
    )
}