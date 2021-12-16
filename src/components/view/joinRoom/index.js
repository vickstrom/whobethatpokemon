import Input from '../input';
import Button from '../button';
import Window from '../window';

export default function JoinRoomView(props) {
    return (
        <Window>
            <p>Join room:</p>
            <Input placeholder={'Room id'} onChange={e => {props.onChange(e)}} />
            <Button color="red" onClick={e => props.onJoin(e)}>Join</Button>
        </Window>
    )
}