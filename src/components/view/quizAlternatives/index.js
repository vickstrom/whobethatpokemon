import './quizAlternatives.css';
import Button from '../button';

export default function QuizAlternativesView(props) {
    return (
        <div>
            <h3>Choose your pokémon</h3>
            <div className={'quizAlternatives grid-container'}>
                {props.alternatives.map((pokemon, index) => {
                    let button_effect = 'red';
                    if (props.myAnswer === pokemon.id) {
                        if (props.ending && props.myAnswer !== props.correctAnswer) {
                            button_effect = 'red';
                        } else {
                            button_effect = 'yellow'
                        } 
                    }
                    if (props.ending && props.correctAnswer === pokemon.id) {
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
