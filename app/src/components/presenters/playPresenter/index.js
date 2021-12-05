import './playPresenter.css'
import QuizAlternativesView from "../../view/quizAlternatives";
import WhoPokemonView from "../../view/whoPokemon";
import pokeAPI from '../../../utils/pokeapi';
import ImageProcessing from '../../../utils/image-processing';
import { useEffect, useState } from 'react';
import LeaderBoardView from "../../view/leaderboard";

export default function PlayPresenter(props) {
    const [imageData, setImageData] = useState();
    const [modifiedImageData, setModifiedImageData] = useState();

    // Placeholder just to get an image, should come from model or something
    useEffect(() => {
    pokeAPI.getPokemon(4).then(res => {
        const img = res.data.sprites.other["official-artwork"]["front_default"];
        setImageData(img);
        ImageProcessing.getImageInSolidColor(img, 111, 111, 111).then(imgData => {
        setModifiedImageData(imgData);
        })
    })
    }, []);

    return (
        <div>
            <div className={'mainView'}>
                <WhoPokemonView image={modifiedImageData} />
                <LeaderBoardView leaderboard={
                    [{name: "Kalle", points: 1337}, {name: "Kungen", points: -1}]
                } />
            </div>
            <QuizAlternativesView alternatives={["Pikachu", "Mewtwo", "Kalle", "Digimon"]}
                onAlternative={e => {props.model.setAnswer(e)}}/>
        </div>
    )
}