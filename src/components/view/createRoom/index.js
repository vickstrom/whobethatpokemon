import './createRoom.css';
import Input from '../input';
import Button from '../button';
import Window from '../window';

export default function CreateRoomView(props) {
    return (
        <Window>
            <Button color="red" onClick={e => props.onSubmit(e)}>Create room</Button>
        </Window>
    )
}