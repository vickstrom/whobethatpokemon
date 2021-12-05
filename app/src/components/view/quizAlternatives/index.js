import './quizAlternatives.css'

export default function QuizAlternativesView(props) {
    return (
        <div className={'quizAlternatives grid-container'}>
            {props.alternatives.map(name => {
                return (<div onClick={() => {console.log("clicked");props.onAlternative(name)}} className={'grid-item'}>{name}</div>);
            })}
        </div>
    )
}