import './login.css';
import Button from '../button';
import Window from '../window';

export default function LoginView(props) {
    return (
        <Window>
            <div className={'login'}>
                <div className={'slider'}>
                    <img className={'bottom'} src={props.pokemonImage} alt="a random pokemon on display" />
                    <img className={'top'} src={props.hiddenPokemonImage} alt="the random pokemon as hidden" />
                </div>
                <h1>Ready to play?</h1>
                <p>Login in as</p>
                <Button color="red" onClick={e => props.onPlay()}>Anonymous</Button>
            </div>
        </Window>
        )
}
