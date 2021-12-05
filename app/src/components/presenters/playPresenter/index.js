import './playPresenter.css'
import QuizAlternativesView from "../../view/quizAlternatives";
import WhoPokemonView from "../../view/whoPokemon";
import { useEffect, useState } from 'react';
import LeaderBoardView from "../../view/leaderboard";

export default function PlayPresenter(props) {
    const [currentRoom, setCurrentRoom] = useState(props.model.getRoom(props.model.currentRoomId));
    const defaultColors = ["grey", "grey", "grey", "grey"]; 
    const [alternativesColors, setAlternativesColors] = useState(["grey", "grey", "grey", "grey"]);
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        props.model.addObserver(() => setCurrentRoom(props.model.getRoom(props.model.currentRoomId)));
    }, []);

    return (
        <div>
            <div className={'mainView'}>
                <WhoPokemonView image={currentRoom.getCurrentImage() || 'http://www.csc.kth.se/~cristi/loading.gif'} />
                <LeaderBoardView leaderboard={
                    [{name: "Kalle", points: 1337}, {name: "Kungen", points: -1}]
                } />
            </div>
            <QuizAlternativesView 
                alternatives={currentRoom.getAlternativesNames()}
                alternativesColors={alternativesColors}
                onGuess={(name, index) => {
                    if (waiting) return;
                    setWaiting(true);
                    let correct = props.model.guess(props.model.currentRoomId, name);
                    var newColors = [...alternativesColors];
                    newColors[index] = correct ? "green" : "red";
                    setAlternativesColors(newColors);
                    setTimeout(async () => {
                        await props.model.newRound(props.model.currentRoomId);
                        setAlternativesColors(defaultColors);
                        setWaiting(false);
                    }, 2000);
                }}/>
        </div>
    )
}