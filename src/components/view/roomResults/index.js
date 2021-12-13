import './roomResults.css'

export default function RoomResultsView(props) {
    return (
        <div className={'roomResults'}>
            <table>
            <tr>
                <th className={'itemRight'}>Room name:</th>
                <th className={'itemMid'}>Players:</th>
                <th className={'itemLeft'}>Click to Join</th>
            </tr>
                {Object.values(props.rooms).map(room => {
                    return (<tr key={room.id}> 
                                <th className={'itemRight'}>{room.name}</th>
                                <th className={'itemMid'}>{}</th>
                                <th className={'itemLeft'}><button onClick={e => props.onJoin(room.id)}>Join</button></th>
                            </tr>)
                })}
            </table>
        </div>

    )
}


