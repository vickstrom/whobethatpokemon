import './leaderboard.css';

export default function LeaderBoardView(props) {
    
    const player_ids = Object.keys(props.leaderboard);
    const player_objects = player_ids.map((player_id) => {
        return {
            name: props.users[player_id] ? props.users[player_id].display_name : 'Unknown',
            points: props.leaderboard[player_id],
            avatar: props.users[player_id] ? props.users[player_id].avatar : 'Unknown',
            player_id: player_id
        }
    })

    player_objects.sort((p1, p2) => p2.points-p1.points);
    return (
        <div className={'leaderboard'}>
            <table>
                <thead>
                    <tr> 
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {player_objects.length > 0 ? player_objects.map((trainer, index) => {
                        return (<tr key={trainer.player_id}>
                            <td>{index + 1}</td>
                            <td><p>{trainer.name}</p></td>
                            <td><p>{trainer.points}p</p></td>           
                            <td>
                                <img src={trainer.avatar} alt="profile avatar"></img>
                            </td>
                        </tr>)
                    }) : <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>}
                </tbody>
            </table>
        </div>
    )
}