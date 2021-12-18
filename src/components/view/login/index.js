import './login.css';
import pokeAPI from '../../../utils/pokeapi';
import ImageProcessing from '../../../utils/image-processing';
import {useState, useEffect} from 'react';
import Button from '../button';
import Window from '../window';

export default function LoginView(props) {
    return (
        <Window>
            <div className={'login'}>
                <div className={'slider'}>
                    <img class={'bottom'} src={props.pokemonImage} />
                    <img class={'top'} src={props.hiddenPokemonImage} />
                </div>
                <h1>Ready to play?</h1>
                    
                <p>Please login</p>
                <Button color="red" onClick={e => props.onPlay()}>Google Account</Button>
                <p>or be</p>
                <Button color="grey" onClick={e => props.onPlay()}>Anonymous</Button>
            </div>
        </Window>
        )
}
