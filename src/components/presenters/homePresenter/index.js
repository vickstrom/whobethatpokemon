import LoginView from '../../view/login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Youtube from '../../view/youtube';

export default function HomePresenter(props) {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    return (
        <div className={'home'}>
            <div>
                <div className={'intro'}>
                    <h1>What is this for masterpiece?</h1>
                    <Youtube id={'IfQumd_o0Gk'} />
                    <p>Are you tired of adulthood and want to re-experience your childhood? Well, we got the right solution for you. Introducing the revolutionary game, Who is the Pokémon?</p>
                </div>
            </div>
            <div>
                <LoginView 
                    onPlay={() => {
                        props.model.localPlayerSignIn(name);
                        props.model.databaseHandler.loginAsAnonymous().then((res) => {
                            console.log(res);
                            props.model.databaseHandler.getAccountDetails().then(snapshot => {
                                if (snapshot.exists()) {
                                    console.log(snapshot.val());
                                    props.model.localPlayerSignIn("Anonymous", snapshot.val().uid)
                                    navigate('/rooms');
                                } else {
                                    console.log("No data available");
                                    navigate('/register');
                                }
                            });
 
                        });
                    }}
                    onText={text => setName(text)}/> 
            </div>
        </div>
    )
}