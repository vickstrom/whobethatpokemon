import { useEffect, useState } from 'react';
import pokeAPI from "../../../utils/pokeapi";
import {getImage} from "../../../utils/utils";
import PracticeSelectorView from "../../view/practiceSelector";
import Spinner from '../../view/spinner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './practicePresenter.css';


export default function PracticePresenter(props) {
    const IDs = Array.from({length: 151}, (_, i) => i + 1);
    const [displayName, setDisplayName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [pokemen, setPokemen] = useState(null);
    const [pokemonID, setPokemonID] = useState(1);
    const [showNames, setShowNames] = useState(false);
    const id = searchParams.get('roomId');
  
    useEffect(() => {
        Promise.all(IDs.map(id => {return pokeAPI.getPokemon(id)}))
        .then(pokemen => {
            Promise.all(pokemen.map((pokemon) => getImage(pokemon.data.sprites.other["official-artwork"]["front_default"]))).then(() => {
                setPokemen(pokemen);
                setShowNames(showNames)
            }
            );
        })
            
    }, []);

    return ( pokemen ?
        <div className={'practicePresenter'}>
            <PracticeSelectorView 
                pokemon={pokemen.map(e => e.data)}
                setPokemon={id => setPokemonID(id)}
                selectedPokemonId={pokemonID}
                disabled= {pokemonID && (displayName.length > 3)? false :true}
                selectedShowNames={showNames}
                setShowNames={e => setShowNames(e)}
            />
        </div>
        : <Spinner></Spinner>  
    ) }