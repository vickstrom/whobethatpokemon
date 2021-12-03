import './leaderboard.css';

export default function LeaderBoardView(props) {
    return (
        <div className={'leaderboard'}>
            <table>
                {props.leaderboard.map((trainer, index) => {
                    return (<tr>
                        <td>{index + 1}.</td>
                        <td>{trainer.name}</td>
                        <td className={'right'}>{trainer.points}</td>
                    </tr>)
                })}
            </table>
        </div>
    )
}

