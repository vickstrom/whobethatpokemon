import './leaderboard.css';

export default function LeaderBoardView(props) {
    
    const player_ids = Object.keys(props.leaderboard);
    const player_objects = player_ids.map((player_id) => {
        return {
            name: player_id,
            points: props.leaderboard[player_id]
        }
    })

    return (
        <div className={'leaderboard'}>
            <h3>Leaderboard:</h3>
            <table>
                {player_objects.map((trainer, index) => {
                    return (<tr>
                        <td>{index + 1}.</td>
                        <td>{trainer.name}</td>
                        <td>{trainer.points}</td>
                    </tr>)
                })}
            </table>
        </div>
    )
}