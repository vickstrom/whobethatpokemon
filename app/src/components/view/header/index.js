import {Link} from 'react-router-dom';
import './header.css';
import logo from '../../../img/whobethatpokemon.png';

export default function Header() {
    return (
        <div className={'header'}>
            <img src={logo} />
            <div>
                <Link to="/">Home</Link>
                <Link to="/play">Play</Link>
                <Link to="/rooms">Rooms</Link>
            </div>
        </div>
    )
}