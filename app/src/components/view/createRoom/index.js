import './createRoom.css'

export default function CreateRoomView() {
    return (
        <div className={'createRoom'}>
            <p>Create room</p>
            <input placeholder={'Room name'} />
            <input type="password" placeholder={'Password'}/>
            <button>Create</button>
        </div>
    )
}