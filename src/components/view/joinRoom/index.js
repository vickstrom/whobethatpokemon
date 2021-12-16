import './joinRoom.css';
import Input from '../input';
import Button from '../button';
import Window from '../window';

export default function JoinRoomView(props) {
    return (
        <Window>
            <div>
            <p>Join room:</p>
            <Input placeholder={'Room id'} onChange={e => {props.onRoomName(e)}} />
            <Button color="red" onClick={e => props.onJoin(e)}>Join</Button>
            </div>
            <div class="message">
            {props.message}
            </div>
        </Window>        
    )
}