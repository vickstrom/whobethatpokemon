import './joinRoom.css';
import Input from '../input';
import Button from '../button';
import Window from '../window';

export default function JoinRoomView(props) {
    return (
        <Window>
            <div>
                <h3>Join room</h3>
            </div>
            <div>
                <Input placeholder={'Link or Room ID'} onChange={e => {props.onRoomName(e)}} />
            </div>
            <div>
                <Button color="red" onClick={e => props.onJoin(e)}>Join</Button>
            </div>
            <div className="message">
            {props.message}
            </div>
        </Window>        
    )
}