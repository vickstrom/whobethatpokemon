import './createRoom.css';
import Button from '../button';
import Window from '../window';

export default function CreateRoomView(props) {
    return (
        <Window>
            <div>
                <h3>Create room</h3>
            </div>
            <div>
            <Button color="red" onClick={e => props.onSubmit(e)}>Create</Button>
            </div>
        </Window>
    )
}