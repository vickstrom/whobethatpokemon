import {Link} from 'react-router-dom';
import './header.css';
import Window from '../window';
import Button from '../button';
import Spinner from '../spinner';
import logo from '../../../img/whobethatpokemon.png';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Header(props) {
    const navigate = useNavigate();
    return (
        <div className={'header'}>
           <div>

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