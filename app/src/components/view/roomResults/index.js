import './roomResults.css'

export default function RoomResultsView() {
    return (
        <div className={'roomResults'}>
            <table>
                <tr>
                    <th>Room name:</th>
                    <th>Players:</th>
                </tr>
                <tr>
                    <td>cool room</td>
                    <td>2/10</td>
                </tr>
            </table>
        </div>

    )
}
