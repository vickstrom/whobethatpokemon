import './whoPokemon.css'

export default function WhoPokemonView(props) {
    return (
        <div className={'whoPokemon'}>
            <img src={props.image}></img>
        </div>
    )
}