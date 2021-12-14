import './quizAlternatives.css'

export default function QuizAlternativesView(props) {
    return (
        <div className={'quizAlternatives grid-container'}>
            {props.alternatives.map((pokemon, index) => {
                let button_effect = '';
                if (props.myAnswer === pokemon.id) {
                    if (props.ending && props.myAnswer !== props.correctAnswer) {
                        button_effect = 'incorrect';
                    } else {
                        button_effect = 'choice'
                    } 
                }
                if (props.ending && props.correctAnswer === pokemon.id) {
                    button_effect = 'correct';
                }
                const name = pokemon.name;
                
                const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
                return (<div 
                    key={pokemon.id}
                    onClick={e => props.onGuess(pokemon.id)}
                    className={`${button_effect} grid-item`}>
                        {formattedName}
                        </div>);
            })} 
        </div>
    )
}
