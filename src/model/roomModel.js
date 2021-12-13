import pokeAPI from "../utils/pokeapi";
import ImageProcessing from '../utils/image-processing';

export default class Room {
    constructor(databaseHandler, id, name, isAdmin=false) {
        this.id = id;
        this.name = name;
        this.trainers = [];
        this.myAnswer = id
        this.databaseHandler = databaseHandler;
        this.isAdmin = isAdmin;
        this.leaderBoard = {};
        this.observers = [];

        this.alternatives = ["Alt. 1", "Alt. 2" , "Alt. 3", "Alt. 4"];
       // this.newRound();

       console.log(this.databaseHandler + "------");
       this.databaseHandler.subscribeToRoom(id, (snapshot) => {
           if (snapshot.exists()) {
               this.loadRoom(snapshot.val());
           }
       })
    }
    
    async newRound() {
        //if (!this.isAdmin) return;
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

    async loadRoom(roomData) {
        const currentGuess = roomData.current_guess;
        const alternativesIds = currentGuess.ids_to_guess_on;
        let alternativesPromise = await Promise.all(
            [pokeAPI.getPokemon(alternativesIds[0]),
             pokeAPI.getPokemon(alternativesIds[1]),
             pokeAPI.getPokemon(alternativesIds[2]),
             pokeAPI.getPokemon(alternativesIds[3])]);
        
        this.correctAnswer = alternativesPromise[0].data;
        this.alternatives = alternativesPromise.map(pokemon => pokemon.data.name);
        this.answerPicture = this.correctAnswer.sprites.other["official-artwork"]["front_default"];
        this.questionPicture = await ImageProcessing.getImageInSolidColor(this.answerPicture, 111, 111, 111);
        this.currentPicture = this.questionPicture;

        this.leaderBoard = roomData.player_scores;
    }

    guess(guess ) {
        //this.myGuess = 
        //this.databaseHandler.guess(this.myId)
    }

    getCurrentImage() {
        //return this.currentPicture;
        return null;
    }

    updateLeaderBoard(){
        
    }
    
    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        this.observers = this.observers.filter(observer => observer != callback);
    }

    notifyObservers(){
        this.observers.forEach(cb=> cb(this));
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