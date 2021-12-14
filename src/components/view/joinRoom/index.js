export default function JoinRoomView(props) {
    return (
        <div>
            <p>Join room:</p>
            <input placeholder={'Room id'} onChange={e => {props.onChange(e)}} />
            <button onClick={e => props.onJoin(e)}>Join</button>
        </div>
    )
}