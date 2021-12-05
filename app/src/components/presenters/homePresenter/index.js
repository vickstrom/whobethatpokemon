import LoginView from '../../view/login';
import './home.css';
import Youtube from '../../view/youtube'

export default function HomePresenter() {



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
                <LoginView /> 
            </div>
        </div>
    )
}
/*
            */