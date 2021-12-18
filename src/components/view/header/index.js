import {useState, useEffect} from 'react';
import './header.css';
import Window from '../window';
import Button from '../button';
import Spinner from '../spinner';
import logo from '../../../img/whobethatpokemon.png';
import { useNavigate, useLocation} from 'react-router-dom';
import pokeAPI from '../../../utils/pokeapi';

export default function Header(props) {
    const location = useLocation();
    const navigate = useNavigate();

    let redirectName = "";
    if (location.pathname === "/play") {
        redirectName = "Rooms";
    }
    else {
        redirectName = "Home";
    }
    const redirect = () => {
        if (location.pathname === "/play") {
            navigate("/room");
        }
        else {
            navigate('/');
        }
    }

    const [avatar, setAvatar] = useState(null); 

    useEffect(() => {
        // Redirect from unallowed pages
        if(location.pathname === '/play' && !props.model.signedIn()) {
            navigate('/');
        }
        else if(location.pathname === '/register' && !props.model.hasUserId()) {
            navigate('/');
        }
        else if(location.pathname === '/room' && !props.model.signedIn()) {
            navigate('/');
        }
        else if(location.pathname !== '/join') {
            navigate('/');
        }
        props.model.addObserver(() => {
            if (props.model.signedIn()) {
                pokeAPI.getPokemon(props.model.account.avatar_id).then(pokemon => {
                    setAvatar(pokemon.data); 
                }) 
            }
        })
    }, [])

    return (
        <div className={'header'}>
           <div className='back'>
               {location.pathname !== "/" ?
               <Window>
                    <Button onClick={() => redirect()} color='red'>&lt;&lt; {redirectName}</Button>
               </Window>
                : null}
           </div>
            <div className='logo'>
                <img src={logo} alt="whobethatpokemon logo" />
            </div>
            <div className='logged-in'>
            {
                props.model.signedIn() ?  
                    <Window>
                        <div className='user-image'>
                            {avatar ? <img src={avatar.sprites.other["official-artwork"]["front_default"]} alt="pokemon" /> : <Spinner></Spinner>} 
                        </div>
                        <div className='user-info'>
                            <div>
                                <h6>Name</h6>
                            </div>
                            <div>
                                <p>{props.model.account.display_name}</p>
                                <Button color={'red'} onClick={() => {navigate(`/register`);}}>Edit profile</Button> 
                            </div> 
                        </div>
                    </Window>
                : null}
            </div>
        </div>
    )
}