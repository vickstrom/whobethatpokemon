import './playPresenter.css'
import QuizAlternativesView from "../../view/quizAlternatives";
import WhoPokemonView from "../../view/whoPokemon";
import { useEffect, useState } from 'react';
import LeaderBoardView from "../../view/leaderboard";

export default function PlayPresenter(props) {
    const [currentRoom, setCurrentRoom] = useState(props.model.getRoom(props.model.currentRoomId));
    const defaultAnswerClasses = ["neutral", "neutral", "neutral", "neutral"]; 
    const [answerClasses, setAnswerClasses] = useState(defaultAnswerClasses);
    const [waiting, setWaiting] = useState(false);
    //const [leaderBoard, setLeaderBoard] = useState(props.model.getRoom(props.model.currentRoomId).leaderBoard)

    useEffect(() => {
        props.model.addObserver(() => setCurrentRoom(props.model.getRoom(props.model.currentRoomId)));
    }, [props.model]);

    console.log(currentRoom.leaderBoard)
    return (
        <div className={"play"}>
            <div className={'play-split'}>
                <div className={'mainView'}>
                    <WhoPokemonView image={currentRoom.getCurrentImage() || 'http://www.csc.kth.se/~cristi/loading.gif'} />
                    <LeaderBoardView leaderboard={
                        [{name: "Kalle", points: 1337}, {name: "Kungen", points: -1}]
                    } />
                </div>
                <QuizAlternativesView 
                    alternatives={currentRoom.getAlternativesNames()}
                    answerClasses={answerClasses}
                    onGuess={(name, index) => {
                        if (waiting) return;
                        setWaiting(true);
                        let [correct, correctName] = props.model.guess(props.model.currentRoomId, name);
                        let correctIndex = currentRoom.getAlternativesNames().indexOf(correctName);
                        var newAnswerClasses = [...answerClasses];
                        newAnswerClasses[index] = correct ? "correct" : "incorrect";
                        // Correct answer should always be green
                        newAnswerClasses[correctIndex] = "correct";
                        setAnswerClasses(newAnswerClasses);
                        setTimeout(async () => {
                            await props.model.newRound(props.model.currentRoomId);
                            setAnswerClasses(defaultAnswerClasses);
                            setWaiting(false);
                        }, 2000);
                    }}/>
            </div>
        </div>
    )
}