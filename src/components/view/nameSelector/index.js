import Window from '../window';
import './nameSelector.css'

export default function NameSelectorView(props) {
    return (
        <div className={'nameSelector'}>
            <Window>
                <input type="text" onChange={e => props.setDisplayName(e.target.value)} />
                <button disabled={props.disabled} onClick={()=> props.createAccount()}>Register</button>
            </Window>
        </div>
    )
}