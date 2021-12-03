import './roomResults.css'

export default function RoomResultsView() {
    return (
        <div className={'roomResults'}>
            <table>
                <tr>
                    <th className={'itemRight'}>Room name:</th>
                    <th className={'itemLeft'}>Players:</th>
                </tr>
                <tr>
                    <td className={'itemRight'}>cool room</td>
                    <td className={'itemLeft'}>2/10</td>
                </tr>
            </table>
        </div>

    )
}