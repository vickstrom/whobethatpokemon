import './login.css';

export default function LoginView(props) {
    return (
        <div className={'login'}>
            <p>Choose your trainer tag:</p>
            <input onChange={e => props.onText(e.target.value)}
                   placeholder={'name'}
                   type='text'>
            </input>
            <button onClick={e => props.onPlay()}>Play</button>
        </div>

    )
}