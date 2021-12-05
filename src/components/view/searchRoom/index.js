import './searchRoom.css'

export default function SearchRoomView() {
    return (
        <div className={'searchRoom'}>
            <p>Search room:</p>
            <input placeholder={'Room name'} />
            <button>Search</button>
        </div>
    )
}