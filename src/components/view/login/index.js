import './login.css';
import pokeAPI from '../../../utils/pokeapi';
import ImageProcessing from '../../../utils/image-processing';
import {useState, useEffect} from 'react';
import Button from '../button';
import Window from '../window';

export default function LoginView(props) {
    const [pokemonImage, setPokemonImage] = useState("");
    const [hiddenPokemonImage, setHiddenPokemonImage] = useState("");

    useEffect(() => {
        pokeAPI.getPokemon(Math.floor(Math.random() * 151 + 1)).then(res => {
            const img = res.data.sprites.other["official-artwork"]["front_default"];
            setPokemonImage(img);
            ImageProcessing.getImageInSolidColor(img, 141, 141, 141).then(imgData => {
                setHiddenPokemonImage(imgData);
            })
        })
    }, []);
    return (
        <Window>
            <div className={'login'}>
                <div className={'slider'}>
                    <img class={'bottom'} src={pokemonImage} />
                    <img class={'top'} src={hiddenPokemonImage} />
                </div>
                <h1>Ready to play?</h1>
                    
                <p>Please login</p>
                <Button color="red" onClick={e => props.onPlay()}>Google Account</Button>
                <p>or be</p>
                <Button color="grey" onClick={e => props.onPlay()}>Anonymous</Button>
            </div>
        </Window>
        )
}
