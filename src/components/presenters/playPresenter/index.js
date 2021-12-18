import './playPresenter.css'
import QuizAlternativesView from "../../view/quizAlternatives";
import WhoPokemonView from "../../view/whoPokemon";
import { useEffect, useState } from 'react';
import LeaderBoardView from "../../view/leaderboard";
import Timer from "../../view/pieTimer"
import InviteFriendsView from "../../view/inviteFriends";
import Window from "../../view/window";
import Spinner from "../../view/spinner";
import { useNavigate } from 'react-router-dom';

export default function PlayPresenter(props) {
    const [leaderBoard, setLeaderBoard] = useState(null);
    const [alternatives, setAlternatives] = useState(null);
    const [picture, setPicture] = useState(null);
    const [myAnswer, setAnswer] = useState(null);
    const [ending, setEnding] = useState(null);
    const [timeLeft, setTimeleft] = useState(false);
    const [copiedLink, setCopiedLink] = useState(null);
    const [owner, setOwner] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (!props.model.currentRoom) {
            return;
        }
        setLeaderBoard(props.model.currentRoom.leaderBoard);
        setPicture(props.model.currentRoom.picture);
        setAlternatives(props.model.currentRoom.alternatives);
        setAnswer(props.model.currentRoom.myAnswer);
        setEnding(props.model.currentRoom.ending);
        setTimeleft((props.model.currentRoom.ending_at_time - Date.now()));
        setOwner(props.model.currentRoom.users[props.model.currentRoom.id]);
        setIsAdmin(props.model.currentRoom.isAdmin);
        setRoomId(props.model.currentRoom.id);
        setCorrectAnswer(props.model.currentRoom.correctAnswer);
        setUsers(props.model.currentRoom.users);
        props.model.currentRoom.addObserver(() => {
            setLeaderBoard(props.model.currentRoom.leaderBoard);
            setPicture(props.model.currentRoom.picture);
            setAlternatives(props.model.currentRoom.alternatives);
            setAnswer(props.model.currentRoom.myAnswer);
            setEnding(props.model.currentRoom.ending);
            setTimeleft((props.model.currentRoom.ending_at_time - Date.now()));
            setOwner(props.model.currentRoom.users[props.model.currentRoom.id]);
            setCorrectAnswer(props.model.currentRoom.correctAnswer);
            setUsers(props.model.currentRoom.users);
        });

        const timer = setInterval(() => {
            setTimeleft(Math.max(0, Math.min(props.model.currentRoom.ending_at_time - Date.now(), 10*1000)));
        }, 50);
        return () => {
            clearInterval(timer);
            if (props.model.currentRoom) {
                props.model.currentRoom.leaveRoom(); 
                props.model.currentRoom = null;
            }
        }
    }, []);

    
    return picture === null ? <Spinner></Spinner> : (
        <div className={"play"}>
            <Window>
                <InviteFriendsView
                    hidden={!isAdmin}
                    roomId={roomId}
                    copyLink={(bool) => setCopiedLink(bool)}
                    hasCopied={copiedLink}
                />
            </Window>
            <Window>
                <div className={'play-split'}>
                    <div className={'mainView'}>
                        <Window>
                            <WhoPokemonView image={picture || <Spinner />} />
                        </Window>
                    </div>
                    {alternatives ?

                        <QuizAlternativesView
                            myAnswer={myAnswer}
                            ending={ending}
                            correctAnswer={correctAnswer}
                            alternatives={alternatives}
                            onGuess={(id) => {
                                props.model.currentRoom.guess(id);
                            }}>
                                <Timer ending={ending} currentTime={timeLeft} totalTime={10 * 1000}></Timer>
                            </QuizAlternativesView> :<Spinner />
                    }
                </div>
            </Window>
            <Window>
                {users ?
                    <LeaderBoardView users={props.model.currentRoom.users} leaderboard={leaderBoard} /> :
                    <Spinner />
                }
            </Window>
        </div>
    )
}