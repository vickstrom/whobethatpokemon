import './joinRoom.css';
export default function JoinRoomView(props) {
    return (
        <div>
            <div>
            <p>Join room:
            <input placeholder={'Room id'} onChange={e => {props.onRoomName(e)}} />
            <button onClick={e => props.onJoin(e)}>Join</button>
            </p>
            </div>
            <div class="message">
            {props.message}
            </div>
        </div>
        
    )
}