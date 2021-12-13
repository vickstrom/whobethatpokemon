import './createRoom.css';

export default function CreateRoomView(props) {
    return (
        <div className={'createRoom'}>
            <p>Create room</p>
            <input placeholder={'Room name'} onChange={e => {props.onChange(e)}} />
            <button onClick={e => props.onSubmit(e)}>Create</button>
        </div>
    )
}