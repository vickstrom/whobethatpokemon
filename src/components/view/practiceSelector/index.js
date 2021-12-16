import React, { Component } from 'react';
import './practiceSelector.css';
import Window from '../window';

function capitalizeFirstLetter(string) {
    if(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else {
        return ' ';
    }


  }

export default function PracticeSelectorView(props) {
    return (
        <div className={'practiceView'}>
            <Window>
                <div className={'pokeSelector'}>Practice</div>
                <div>Selected Pokemon: {capitalizeFirstLetter(props.pokemon[props.selectedPokemonId-1].name)}</div>
                <button>Show Names</button>
            </Window>
            
            <Window>
                <div className={'pokeSelector'}>
                    {props.pokemon.map(pokemon => {
                        return (<div key={pokemon.id}
                            onClick={e => props.setPokemon(pokemon.id)}>
                                <div className={`imageContainer ${(props.selectedPokemonId === pokemon.id ? 'selected' : 'unselected')}
                                                    ${(props.selectedPokemonId !== pokemon.id) && (props.selectedPokemonId !== null) ? 'discarded' : ''}`}>
                                        <img src={pokemon.sprites.other["official-artwork"]["front_default"]}></img>
                                </div>
                                <div>
                                    <div className={'imageName'}>{capitalizeFirstLetter(pokemon.name)}</div>
                                </div>
                        </div>)
                    })}
                </div>
            </Window>
        </div>
    )
}
