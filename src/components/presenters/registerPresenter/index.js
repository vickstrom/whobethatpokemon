import { useEffect, useState } from 'react';
import pokeAPI from "../../../utils/pokeapi";
import {getImage, getRandomdIds} from "../../../utils/utils";
import ProfileSelectorView from "../../view/profileSelector";
import { useNavigate, useSearchParams } from 'react-router-dom';
import NameSelectorView from '../../view/nameSelector';
import Spinner from '../../view/spinner';
import './registerPresenter.css';

export default function RegisterPresenter(props) {
    const [displayName, setDisplayName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [pokemen, setPokemen] = useState(null);
    const [pokemonID, setPokemonID] = useState(null);
    const id = searchParams.get('roomId');
  
    useEffect(() => {
        if(props.model.account){
            setDisplayName(props.model.account.display_name)
        };
        Promise.all(getRandomdIds(80, 151).map(id => {
            return pokeAPI.getPokemon(id)} 
        ))
        .then(pokemen => {
            Promise.all(pokemen.map((pokemon) => getImage(pokemon.data.sprites.other["official-artwork"]["front_default"]))).then(() => {
                setPokemen(pokemen)
            });
        }
            )
    }, []);

    return ( pokemen ?
        <div className={'registerPresenter'}>
            <ProfileSelectorView 
                pokemon={pokemen.map(e => e.data)}
                setPokemon={id => setPokemonID(id)}
                selectedPokemonId={pokemonID}
            />
            <NameSelectorView
                setDisplayName={name => setDisplayName(name)}
                displayName={displayName}
                createAccount={() => {
                    props.model.createAnonymousAccount(displayName, pokemonID).then(() => {
                        navigate('/room' + (id ? `?roomId=${id}` : ''));
                    });}}
                disabled= {pokemonID && (displayName.length > 2)? false :true}
            />
        </div>
         : <Spinner />
    ) }