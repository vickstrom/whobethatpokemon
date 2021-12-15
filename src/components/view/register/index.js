import React, { Component } from 'react'
import Select from 'react-select'

const pokePic = pokemon => {return <img src={pokemon.sprites.other["official-artwork"]["front_default"]}></img>}
export default function RegisterView(props) {
    const pokeOptions = props.pokemon.map(pokemon => {return { value: pokemon.id, label: pokePic(pokemon)}})
    return (
        <div>
            <div>
            <Select onChange={e => props.setPokemon(e.value)} options={pokeOptions}/>
            </div>
            <input type="text" onChange={e => props.setDisplayName(e.target.value)} />

            <button disabled={props.disabled} onClick={()=> props.createAccount()}>Register</button>
        </div>
    )
}
