import pokeAPI from "../utils/pokeapi";
import ImageProcessing from '../utils/image-processing';

export default class Room {
    constructor(databaseHandler, id, name, isAdmin=false) {
        this.id = id;
        this.name = name;
        this.trainers = [];
        this.myAnswer = -1;
        this.databaseHandler = databaseHandler;
        this.isAdmin = isAdmin;
        this.leaderBoard = {};
        this.observers = [];
        this.ending = false;
        this.alternatives = ["Alt. 1", "Alt. 2" , "Alt. 3", "Alt. 4"];
        this.expected_id = -1;

        console.log(databaseHandler)
        setInterval(() => {
            if (!this.ending && (this.ending_at_time < Date.now())) {
                this.ending = true;
                this.picture = this.answerPicture;
                this.notifyObservers();
                if (id === databaseHandler.user.uid) {
                    this.databaseHandler.evaluateScores(this.currentGuess.expected_id, this.currentGuess.round_id).then(() => {
                        setTimeout(() => {
                            this.databaseHandler.startNewRound().then(() => {
                                this.ending = false;
                            });
                        }, 3000);
                    });
                }
            }
        }, 200); 

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
        this.roomData = roomData;
        this.currentGuess = roomData.current_guess;
        const alternativesIds = this.currentGuess.ids_to_guess_on;
        let alternativesPromise = await Promise.all(
            [pokeAPI.getPokemon(alternativesIds[0]),
             pokeAPI.getPokemon(alternativesIds[1]),
             pokeAPI.getPokemon(alternativesIds[2]),
             pokeAPI.getPokemon(alternativesIds[3])]);
        
        this.correctAnswer = alternativesPromise[0].data;
        this.alternatives = alternativesPromise.map(pokemon => pokemon.data);
        this.answerPicture = this.correctAnswer.sprites.other["official-artwork"]["front_default"];
        this.questionPicture = await ImageProcessing.getImageInSolidColor(this.answerPicture, 111, 111, 111);
        this.leaderBoard = roomData.players_scores ? roomData.players_scores : {};
        console.log(this.leaderBoar);
        this.ending_at_time = this.currentGuess.ending_at_time;
        this.picture = this.ending_at_time < Date.now() ? this.answerPicture :this.questionPicture;
        this.expected_id = this.currentGuess.expected_id;
        this.notifyObservers();
    }

    guess(guess_id) {
        console.log(guess_id);
        this.databaseHandler.guess(guess_id, this.currentGuess.round_id, this.id).then(() => {
            this.myAnswer = guess_id;
            this.notifyObservers();
        });

        
        //this.myGuess = 
        //this.databaseHandler.guess(this.myId)
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