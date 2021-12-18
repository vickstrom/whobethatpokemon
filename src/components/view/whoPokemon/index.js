import './whoPokemon.css'

export default function WhoPokemonView(props) {
    return (
        <div className={'whoPokemon'}>
            <img src={props.image} alt="pokemon to guess on"></img>
        </div>
    )
}