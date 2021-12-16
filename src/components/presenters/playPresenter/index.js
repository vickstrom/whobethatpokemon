import './playPresenter.css'
import QuizAlternativesView from "../../view/quizAlternatives";
import WhoPokemonView from "../../view/whoPokemon";
import { useEffect, useState } from 'react';
import LeaderBoardView from "../../view/leaderboard";
import Timer from "../../view/pieTimer"
import InviteFriendsView from "../../view/inviteFriends";
import Window from "../../view/window";
import Spinner from "../../view/spinner";

export default function PlayPresenter(props) {
    const [leaderBoard, setLeaderBoard] = useState(props.model.currentRoom.leaderBoard);
    const [alternatives, setAlternatives] = useState(props.model.currentRoom.alternatives);
    const [picture, setPicture] = useState(props.model.currentRoom.picture);
    const [myAnswer, setAnswer] = useState(props.model.currentRoom.myAnswer);
    const [ending, setEnding] = useState(props.model.currentRoom.ending);
    const [timeLeft, setTimeleft] = useState(false);

    useEffect(() => {
        props.model.currentRoom.addObserver(() => {
            setLeaderBoard(props.model.currentRoom.leaderBoard); 
            setPicture(props.model.currentRoom.picture); 
            setAlternatives(props.model.currentRoom.alternatives);
            setAnswer(props.model.currentRoom.myAnswer);
            setEnding(props.model.currentRoom.ending);
            setTimeleft((props.model.currentRoom.ending_at_time - Date.now()));
        });

        const timer = setInterval(() => {
            setTimeleft(Math.max(0, (props.model.currentRoom.ending_at_time - Date.now())));
        }, 50);
        return () => {
            clearInterval(timer);
            if (props.model.currentRoom) {
                props.model.currentRoom.leaveRoom(); 
                props.model.currentRoom = null;
            }
        }
    }, []);

    const owner = props.model.currentRoom.users[props.model.currentRoom.id];
    

    return (
        <div className={"play"}>
            <Window>
                <InviteFriendsView
                    hidden={!props.model.currentRoom.isAdmin}
                    roomId={props.model.currentRoom.id}
                />
            </Window>
            <Window>
                <div className={'play-split'}>
                    <div className='play-header'>
                        <div>
                            <h3>{owner ? `${owner.display_name}\'s room` : 'Room'} </h3>
                        </div>
                        <div>
                            {<Timer ending={ending} currentTime={timeLeft} totalTime={10 * 1000}></Timer>}
                        </div>
                    </div>
                    <div className={'mainView'}>
                        <Window>
                            <WhoPokemonView image={picture || <Spinner />} />
                        </Window>
                    </div>
                    <QuizAlternativesView 
                        myAnswer={myAnswer}
                        ending={ending}
                        correctAnswer={props.model.currentRoom.expected_id}
                        alternatives={alternatives}
                        onGuess={(id) => {
                            props.model.currentRoom.guess(id);
                        }}/>
                </div>
            </Window>
            <Window>
                <LeaderBoardView users={props.model.currentRoom.users} leaderboard={leaderBoard} />
            </Window>
        </div>
    )
}