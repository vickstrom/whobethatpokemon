import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokeAPI from "../../../utils/pokeapi";
import RegisterView from "../../view/register";

export default function RegisterPresenter(props) {
    const randomIDs = Array.from({length: 20}, () => Math.floor(Math.random() * 898 + 1));
    const [displayName, setDisplayName] = useState("");
    const navigate = useNavigate();
    const [pokemen, setPokemen] = useState(null);
    const [pokemonID, setPokemonID] = useState(null);

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
                    navigate('/rooms');
                });
                console.log("register")}}
            />
        </div>
        :null
    ) }