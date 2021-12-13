import pokeAPI from "../utils/pokeapi";
import ImageProcessing from '../utils/image-processing';

export default class Room {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.trainers = [];
        this.newRound();
        this.leaderBoard = [];
        this.observers = [];
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

    guess(name, trainerId) {
        this.currentPicture = this.answerPicture;
        if(name === this.correctAnswer.name) {
            this.increasePoints(trainerId);
            this.updateLeaderBoard();
            console.log(this.leaderBoard)
            return [true, this.correctAnswer.name];

        } else {
            return [false, this.correctAnswer.name];
        }
    }

    updateLeaderBoard(){
        if(this.leaderBoard.length >= 1){return}
        const leaderBoard = [...this.trainers].sort(compareScore);
        console.log(leaderBoard)
        this.leaderBoard = leaderBoard;
        
    }

    getAlternativesNames() {
        return this.alternatives.map(alt => alt.name);
    }

    getCurrentImage() {
        return this.currentPicture;
    }

    increasePoints(trainerId){
        //console.log(this.trainers[trainerIndex])
        const trainerIndex = this.trainers.findIndex(e => e.id === trainerId);
        const newpoints = this.trainers[trainerIndex].points + 1;
        this.trainers[trainerIndex].points = newpoints;
        console.log(this.trainers[trainerIndex])
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

function compareScore(a,b){
    if(a.points < b.points)
    return -1;
 else if(a.points > b.points)
     return 1;
 if(a.name < b.name)
     return -1;
 else if(a.name > b.name)
     return 1;
 throw console.error("this is bad");
}