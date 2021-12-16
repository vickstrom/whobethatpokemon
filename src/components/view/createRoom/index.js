import './createRoom.css';
import Input from '../input';
import Button from '../button';
import Window from '../window';

export default function CreateRoomView(props) {
    return (
        <Window>
            <p>Create room:</p>
            <Input placeholder={'Room name'} onChange={e => {props.onChange(e)}} />
            <Button color="red" onClick={e => props.onSubmit(e)}>Create</Button>
        </Window>
    )
}