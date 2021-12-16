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
        this.users = {};
        this.currentRoundId = null;


        this.gameloop = setInterval(() => {
            if (!this.ending && (this.ending_at_time < Date.now())) {
                this.ending = true;
                this.picture = this.answerPicture;
                this.notifyObservers();
                if (id === databaseHandler.user.uid) {
                    this.databaseHandler.evaluateScores(this.currentGuess.expected_id, this.currentGuess.round_id).then(() => {
                        setTimeout(() => {
                            this.databaseHandler.startNewRound();
                        }, 3000);
                    });
                }
            }
        }, 200);

       console.log(this.databaseHandler + "------");
       this.roomSubscriptionPromise = this.databaseHandler.subscribeToRoom(id, (snapshot) => {
           if (snapshot.exists()) {
               this.loadRoom(snapshot.val());
           }
       })
    }

    leaveRoom() {
        clearInterval(this.gameloop); 
        this.roomSubscriptionPromise.then(unsub => {
            unsub();
        });
    }

    async loadRoom(roomData) {
        this.roomData = roomData;
        console.log(roomData);
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
        this.leaderBoard = roomData.players_scores ? roomData.players_scores : {[this.databaseHandler.user.uid]: 0};
        this.ending_at_time = this.currentGuess.ending_at_time;
        this.picture = this.ending_at_time < Date.now() ? this.answerPicture :this.questionPicture;
        this.expected_id = this.currentGuess.expected_id;
        this.getTrainersInfo(this.leaderBoard)
        if (this.currentGuess.round_id != this.currentRoundId) {
            this.currentRoundId = this.currentGuess.round_id;
            this.ending = false;
        }
        this.notifyObservers();
    }

    guess(guess_id) {
        console.log(guess_id);
        this.databaseHandler.guess(guess_id, this.currentGuess.round_id, this.id).then(() => {
            this.myAnswer = guess_id;
            this.notifyObservers();
        });
    }

    async getTrainersInfo(player_scores) {
        const player_ids = Object.keys(player_scores);
        const ids_to_be_retrieved = [];
        for (let i = 0; i < player_ids.length; i++) {
            if (!this.users[player_ids]) {
                ids_to_be_retrieved.push(player_ids);
            }
        }
        Promise.all(ids_to_be_retrieved.map(id => {
            return this.databaseHandler.getTrainerDetails(id);
        })).then(snapshot_trainers => {
            for (let i = 0; i < snapshot_trainers.length; i++) {
                if (snapshot_trainers[i].exists()) {
                    this.users[ids_to_be_retrieved[i]] = snapshot_trainers[i].val();
                }
            }
        });
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
