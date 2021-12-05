import LoginView from '../../view/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePresenter(props) {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    return (
        <LoginView 
            onPlay={() => {
                props.model.localPlayerSignIn(name);
                navigate('/rooms');
            }}
            onText={text => setName(text)}/> 
    )
}