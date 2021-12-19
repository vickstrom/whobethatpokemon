import LoginView from '../../view/login';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './home.css';
import Spinner from '../../view/spinner';
import pokeAPI from '../../../utils/pokeapi';
import ImageProcessing from '../../../utils/image-processing';
import {useState, useEffect} from 'react';

export default function HomePresenter(props) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('roomId');

    const [pokemonImage, setPokemonImage] = useState(null);
    const [hiddenPokemonImage, setHiddenPokemonImage] = useState(null);

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
        <div className={'home'}>
            <div>
                <div className={'intro'}>
                    <h1>Who's that Pokémon? It's...</h1>
                    <img alt="tv show segment" src="https://cdn.vox-cdn.com/thumbor/IhuPwFLVg19jF8B6rSmpy5T1-tY=/0x0:1920x1080/1400x788/filters:focal(807x387:1113x693):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53254027/who_pokemon.0.jpg" />
            
                    <p>Are you tired of adulthood and want to re-experience your childhood? This might just be the game for you!</p>
                    <p>Introducing: <b>Who Be That Pokémon?</b></p>
                    <p> A game that is similar, <b>but legally distinct</b>, from something you might remember from your childhood.</p>
                </div>
            </div>
            <div>
                {pokemonImage && hiddenPokemonImage ? <LoginView 
                    hiddenPokemonImage={hiddenPokemonImage}
                    pokemonImage={pokemonImage}
                    onPlay={() => {
                        props.model.anonymousLogin().then(() => {
                            props.model.loadAccountDetails().then(accountExists => {
                                if (accountExists) {
                                    navigate('/room' + (id ? `?roomId=${id}` : ''));
                                } else {
                                    navigate('/register' + (id ? `?roomId=${id}` : ''));
                                }
                            })
                        });
                    }}
                    /> : <Spinner></Spinner>}
            </div>
        </div>
    )
}