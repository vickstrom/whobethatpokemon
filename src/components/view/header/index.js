import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './header.css';
import Window from '../window';
import Button from '../button';
import Spinner from '../spinner';
import logo from '../../../img/whobethatpokemon.png';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import pokeAPI from '../../../utils/pokeapi';

export default function Header(props) {
    const navigate = useNavigate();
    const location = useLocation();

    let redirectName = "";
    if (location.pathname === "/register") {
        redirectName = "Home";
    }
    else if (location.pathname === "/room") {
        redirectName = "Home";
    }
    else if (location.pathname === "/play") {
        redirectName = "Rooms";
    }
    const redirect = () => {
        if (location.pathname === "/register") {
            navigate("/");
        }
        else if (location.pathname === "/room") {
            navigate("/");
        }
        else if (location.pathname === "/play") {
            navigate("/room");
        }
    }

    const [signedIn, setSignedIn] = useState();
    const [avatar, setAvatar] = useState(null); 

    useEffect(() => {
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
                <img src={logo} />
            </div>
            <div className='logged-in'>
            {
                props.model.signedIn() ?  
                    <Window>
                        <div className='user-image'>
                            {avatar ? <img src={avatar.sprites.other["official-artwork"]["front_default"]} /> : <Spinner></Spinner>} 
                        </div>
                        <div className='user-info'>
                            <div>
                                <h6>Name</h6>
                            </div>
                            <div>
                                <p>{props.model.account.display_name}</p>
                                <Button color={'grey'} onClick={() => {navigate(`/register`);}}>Edit profile</Button> 
                            </div> 
                        </div>
                    </Window>
                : null}
            </div>
        </div>
    )
}