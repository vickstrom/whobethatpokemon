import './quizAlternatives.css'

export default function QuizAlternativesView(props) {
    return (
        <div className={'quizAlternatives grid-container'}>
            {props.alternatives.map((pokemon, index) => {
                return (<div 
                    key={pokemon.id}
                    onClick={e => props.onGuess(pokemon.id)}
                    className={`${pokemon.id === props.myAnswer ? 'choice' : ''} grid-item`}>
                        {pokemon.name}
                        </div>);
            })} 
        </div>
    )
}