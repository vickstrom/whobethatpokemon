import Window from '../window';
import Input from '../input';
import Button from '../button';
import './nameSelector.css'

export default function NameSelectorView(props) {
    return (
        <div className={'nameSelector'}>
            <Window>
                <h3 className={'header'}>Choose your trainer name:</h3>
                <Input type="text" onChange={e => props.setDisplayName(e.target.value)} />
                <Button color="green"
                        disabled={props.disabled}
                        onClick={()=> props.createAccount()}> Register</ Button>
            </Window>
        </div>
    )
}