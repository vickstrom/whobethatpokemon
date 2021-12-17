import './quizAlternatives.css';
import Button from '../button';

export default function QuizAlternativesView(props) {
    return (
        <div>
            <h3>{props.ending ? `It's... ${props.correctAnswer.name.charAt(0).toUpperCase() + props.correctAnswer.name.slice(1)}!` :"Who's that Pokemón?"}</h3>
            <div className={'quizAlternatives grid-container'}>
                {props.alternatives.map((pokemon, index) => {
                    let button_effect = 'blue';
                    if (props.myAnswer === pokemon.id) {
                        if (props.ending && props.myAnswer !== props.correctAnswer.id) {
                            button_effect = 'red';
                        } else {
                            button_effect = 'yellow'
                        } 
                    }
                    if (props.ending && props.correctAnswer.id === pokemon.id) {
                        button_effect = 'green';
                    }
                    const name = pokemon.name;
                    
                    const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
                    return (
                    <div key={pokemon.id} className={'grid-item'}> 
                        <Button
                            onClick={e => props.onGuess(pokemon.id)}
                            color={`${button_effect}`}>
                                {formattedName}
                        </Button>
                    </div>
                    );
                })} 
            </div>
        </div>
    )
}
