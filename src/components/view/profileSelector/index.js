import React, { Component } from 'react';
import './profileSelector.css';
import Window from '../window';

export default function ProfileSelectorView(props) {
    return (
        <div className={'registerView'}>
            <Window>
                <div className={'pokeSelector'}>
                    {props.pokemon.map(pokemon => {
                        return (<div key={pokemon.id}
                            onClick={e => props.setPokemon(pokemon.id)}>
                                <div className={`imageContainer ${(props.selectedPokemonId === pokemon.id ? 'selected' : 'unselected')}
                                                    ${(props.selectedPokemonId !== pokemon.id) && (props.selectedPokemonId !== null) ? 'discarded' : ''}`}>
                                    <img src={pokemon.sprites.other["official-artwork"]["front_default"]}></img>
                                </div>
                        </div>)
                    })}
                </div>
            </Window>
        </div>
    )
}
