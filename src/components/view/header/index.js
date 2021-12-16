import {Link} from 'react-router-dom';
import './header.css';
import Window from '../window';
import Button from '../button';
import Spinner from '../spinner';
import logo from '../../../img/whobethatpokemon.png';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

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
                <Window>
                    <div className='user-image'>
                        {<Spinner></Spinner>} 
                    </div>
                    <div className='user-info'>
                        <div>
                            <h6>Name</h6>
                        </div>
                        <div>
                            <p>Pokéboi</p>
                            <Button color={'grey'} onClick={() => {navigate(`/register`);}}>Edit profile</Button> 
                        </div> 
                    </div>
                </Window>
            </div>
        </div>
    )
}