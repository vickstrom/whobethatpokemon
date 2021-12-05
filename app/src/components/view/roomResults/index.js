import './roomResults.css'

export default function RoomResultsView(props) {
    return (
        <div className={'roomResults'}>
            {Object.values(props.rooms).map(room => {
                return (<div key={room.id}> 
                    <span>{room.name}</span>
                    <span>{room.players}</span>
                    <button onClick={e => props.onJoin(room.id)}>Join</button>
                    </div>)
            })}
        </div>

    )
}
