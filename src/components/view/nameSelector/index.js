import Window from '../window';
import Input from '../input';
import Button from '../button';
import './nameSelector.css'

export default function NameSelectorView(props) {
    return (
        <div className={'nameSelector'}>
            <Window>
                <p>To register, pick a name with at least three characters and an avatar!</p>
                <h3>Choose your trainer name</h3>
                <div>
                    <Input placeholder={props.displayName} maxLength={10} type="text" onChange={e => props.setDisplayName(e.target.value)} />
                </div>
                <div>
                    <Button color="green"
                            disabled={props.disabled}
                            onClick={()=> props.createAccount()}> Register</ Button>
                </div>
            </Window>
        </div>
    )
}