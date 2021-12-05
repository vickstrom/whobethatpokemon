import pokeAPI from "../utils/pokeapi";
import ImageProcessing from '../utils/image-processing';

export default class Room {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.trainers = [];
        this.newRound();
    }
    
    async newRound() {
        let alternativesIds = getRandomdIds(4);
        let alternativesPromise = await Promise.all(
            [pokeAPI.getPokemon(alternativesIds[0]),
             pokeAPI.getPokemon(alternativesIds[1]),
             pokeAPI.getPokemon(alternativesIds[2]),
             pokeAPI.getPokemon(alternativesIds[3])]);
        this.alternatives = alternativesPromise.map(pokemon => pokemon.data);
        this.correctAnswer = this.alternatives[between(0, 4)];
        this.answerPicture = this.correctAnswer.sprites.other["official-artwork"]["front_default"];
        this.questionPicture = await ImageProcessing.getImageInSolidColor(this.answerPicture, 111, 111, 111);
        this.currentPicture = this.questionPicture;
    }

    guess(name, playerId) {
        this.currentPicture = this.answerPicture;
        if(name === this.correctAnswer.name) {
            return [true, this.correctAnswer.name];
        } else {
            return [false, this.correctAnswer.name];
        }
    }

    getAlternativesNames() {
        return this.alternatives.map(alt => alt.name);
    }

    getCurrentImage() {
        return this.currentPicture;
    }
}

const getRandomdIds = (num_ids) => {
    const ids = []
    while (ids.length < num_ids) {
        const val = Math.floor(Math.random() * 151 + 1)
        if (ids.filter((v) => v === val).length === 0)
            ids.push(val);
    }
    return ids;
  }

function between(min, max) {  
    return Math.floor(
        Math.random() * (max - min) + min
    )
}