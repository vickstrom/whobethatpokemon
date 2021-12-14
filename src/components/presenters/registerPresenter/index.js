import { useEffect, useState } from 'react';
import pokeAPI from "../../../utils/pokeapi";
import RegisterView from "../../view/register";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function RegisterPresenter(props) {
    const randomIDs = Array.from({length: 20}, () => Math.floor(Math.random() * 898 + 1));
    const [displayName, setDisplayName] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [pokemen, setPokemen] = useState(null);
    const [pokemonID, setPokemonID] = useState(null);
    const id = searchParams.get('roomId');
  
    useEffect(() => {
        Promise.all(randomIDs.map(id => {return pokeAPI.getPokemon(id)}))
        .then(pokemen => {console.log(pokemen);setPokemen(pokemen)})
        .catch(error => {console.log(error)})
    }, []);

    return ( pokemen ?
        <div>
            <RegisterView 
            pokemon={pokemen.map(e => e.data)}
            setPokemon={id => setPokemonID(id)}
            setDisplayName={name => setDisplayName(name)}
            disabled= {pokemonID && (displayName.length > 3)? false :true}
            createAccount={() => {
                props.model.databaseHandler.setAccountDetails(displayName, pokemonID).then(() => {
                    navigate('/room' + (id ? `?roomId=${id}` : ''));
                });
                console.log("register")}}
            />
        </div>
        :null
    ) }