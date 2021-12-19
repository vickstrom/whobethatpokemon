import './login.css';
import Button from '../button';
import Window from '../window';
import {useNavigate} from 'react-router-dom';

export default function LoginView(props) {
    const navigate = useNavigate();
    return (
        <Window>
            <div className={'login'}>
                <div className={'slider'}>
                    <img className={'bottom'} src={props.pokemonImage} alt="a random pokemon on display" />
                    <img className={'top'} src={props.hiddenPokemonImage} alt="the random pokemon as hidden" />
                </div>
                <h1>Ready to play?</h1>
                <Button color="red" onClick={e => props.onPlay()}>Login</Button>
                <p>or</p>
                <Button 
                        color="blue"
                        onClick={() => {navigate("/practice")}}
                    >Practice
                    </Button>
            </div>
        </Window>
        )
}
