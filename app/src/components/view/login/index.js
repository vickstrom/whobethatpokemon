
import './login.css'

export default function LoginView() {
    return (
        <div className={'login'}>
            <p>Choose your trainer tag:</p>
            <input placeholder={'name'} />
            <button>Play</button>
        </div>

    )
}