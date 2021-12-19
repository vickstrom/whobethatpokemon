import React from 'react';
import './practiceSelector.css';
import Window from '../window';
import Button from '../button';

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
                <h2>{capitalizeFirstLetter(props.pokemon[props.selectedPokemonId-1].name)}</h2>
                <div>
                    <img alt={props.pokemon[props.selectedPokemonId-1].name} src={props.pokemon[props.selectedPokemonId-1].sprites.other["official-artwork"]["front_default"]} />
                </div>
                <Button color="red" onClick={e => props.setShowNames(!props.selectedShowNames)}>Show Names</Button>
            </Window>
            <Window>
                <div className={'pokeSelector'}>
                    {props.pokemon.map(pokemon => {
                        return (<div key={pokemon.id}
                            onClick={e => props.setPokemon(pokemon.id)}>
                                <div className={`imageContainerPractice ${(props.selectedPokemonId === pokemon.id ? 'selectedPractice' : 'unselectedPractice')}
                                                    ${(props.selectedPokemonId !== pokemon.id) && (props.selectedPokemonId !== null) ? 'discarded' : ''}`}>
                                        <img alt={pokemon.name} src={pokemon.sprites.other["official-artwork"]["front_default"]}></img>
                                </div>
                                <div>
                                    <div className={`imageName ${(props.selectedShowNames ? '' : 'hide')}`}>{capitalizeFirstLetter(pokemon.name)}</div>
                                </div>
                        </div>)
                    })}
                </div>
            </Window>
        </div>
    )
}
