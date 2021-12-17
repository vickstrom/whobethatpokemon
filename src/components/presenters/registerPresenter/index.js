import { useEffect, useState } from 'react';
import pokeAPI from "../../../utils/pokeapi";
import ProfileSelectorView from "../../view/profileSelector";
import { useNavigate, useSearchParams } from 'react-router-dom';
import NameSelectorView from '../../view/nameSelector';
import Spinner from '../../view/spinner';
import './registerPresenter.css';

export default function RegisterPresenter(props) {
    const randomIDs = Array.from({length: 100}, () => Math.floor(Math.random() * 898 + 1));
    const [displayName, setDisplayName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [pokemen, setPokemen] = useState(null);
    const [pokemonID, setPokemonID] = useState(null);
    const id = searchParams.get('roomId');
  
    useEffect(() => {
        if(props.model.account){console.log(props.model.account);setDisplayName(props.model.account.display_name)};
        Promise.all(randomIDs.map(id => {return pokeAPI.getPokemon(id)}))
        .then(pokemen => {console.log(pokemen);setPokemen(pokemen)})
        .catch(error => {console.log(error)})
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
                    });
                console.log("register")}}
                disabled= {pokemonID && (displayName.length > 2)? false :true}
            />
        </div>
         : <Spinner />
    ) }