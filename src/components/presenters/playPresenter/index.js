import './playPresenter.css'
import QuizAlternativesView from "../../view/quizAlternatives";
import WhoPokemonView from "../../view/whoPokemon";
import { useEffect, useState } from 'react';
import LeaderBoardView from "../../view/leaderboard";

export default function PlayPresenter(props) {
    const [leaderBoard, setLeaderBoard] = useState(props.model.currentRoom.leaderBoard);
    const [alternatives, setAlternatives] = useState(props.model.currentRoom.alternatives);
    const [picture, setPicture] = useState(props.model.currentRoom.currentPicture);

    const defaultAnswerClasses = ["neutral", "neutral", "neutral", "neutral"]; 
    const [answerClasses, setAnswerClasses] = useState(defaultAnswerClasses);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        props.model.currentRoom.addObserver(() => {
            setLeaderBoard(props.model.currentRoom.leaderBoard); 
            setPicture(props.model.currentRoom.picture); 
            setAlternatives(props.model.currentRoom.alternatives);
        });
    }, []);

    return (
        <div className={"play"}>
            <div className={'play-split'}>
                <div className={'mainView'}>
                    <WhoPokemonView image={picture || 'http://www.csc.kth.se/~cristi/loading.gif'} />
                    <LeaderBoardView leaderboard={leaderBoard} />
                </div>
                <QuizAlternativesView 
                    alternatives={alternatives}
                    answerClasses={answerClasses}
                    onGuess={(name, index) => {
                   //      if (waiting) return;
                   //      setWaiting(true);
                   //      let [correct, correctName] = props.model.guess(props.model.currentRoomId, name);
                   //      let correctIndex = currentRoom.getAlternativesNames().indexOf(correctName);
                   //      var newAnswerClasses = [...answerClasses];
                   //      newAnswerClasses[index] = correct ? "correct" : "incorrect";
                   //      // Correct answer should always be green
                   //      newAnswerClasses[correctIndex] = "correct";
                   //      setAnswerClasses(newAnswerClasses);
                   //      setTimeout(async () => {
                   //          await props.model.newRound(props.model.currentRoomId);
                   //          setAnswerClasses(defaultAnswerClasses);
                   //          setWaiting(false);
                   //      }, 2000);
                    }}/>
            </div>
        </div>
    )
}