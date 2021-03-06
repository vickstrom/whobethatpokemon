import React from 'react';
import './profileSelector.css';
import Window from '../window';

export default function ProfileSelectorView(props) {
    return (
        <div className={'registerView'}>
            <Window>
                <h3>Choose your profile avatar</h3>
                <div className={'pokeSelector'}>
                    {props.pokemon.map(pokemon => {
                        return (<div key={pokemon.id}
                            onClick={e => props.setPokemon(pokemon.id)}>
                                <div className={`imageContainer ${(props.selectedPokemonId === pokemon.id ? 'selected' : 'unselected')}`}>
                                    <img src={pokemon.sprites.other["official-artwork"]["front_default"]} alt={pokemon.name}></img>
                                </div>
                        </div>)
                    })}
                </div>
            </Window>
        </div>
    )
}
