import Room from './roomModel';

export default class PokeModel{
    constructor(trainers={}, rooms={})
    {
        this.setTrainers(trainers);
        this.setRooms(rooms);
        this.observers = [];
        this.counter = 0; // Used for generating IDs, remove later (?)
        let dummyRoomId = this.generateId(); // Remove later?
        this.rooms[dummyRoomId] = new Room(dummyRoomId, 'testRum');
    }

    // Used for generating IDs, remove later (?)
    generateId(){
        const newId = this.counter;
        this.counter++;
        return newId;
    }

    setRooms(rooms){
        this.rooms = rooms;
    }

    setTrainers(trainers){
        this.trainers = trainers;
    }

    localPlayerSignIn(name) {
        this.myId = this.generateId();
        this.addNewTrainer(name, this.myId);
    }

    addNewTrainer(name, id){
        const trainer = {id: id, name: name, points: 0};
        this.trainers[id] = trainer;
        this.notifyObservers();
    }
    
    updateLeaderBoard(){
        const leaderBoard = Object.values(this.trainers).map(trainer => {return {name: trainer.name, points: trainer.points}}).sort(compareScore);
        this.leaderBoard = leaderBoard;
        this.notifyObservers();
    }

    joinRoom(trainerId, roomId) {
        this.trainer = trainerId;
        this.addTrainerToRoom(trainerId, roomId);
        this.currentRoomId = roomId;
    }

    addTrainerToRoom(trainerId, roomId){
        // Very non-functional atm
        const trainer = this.trainers[trainerId]
        trainer.points = 0
        this.rooms[roomId].trainers.push(trainer);
        console.log(this.rooms[roomId].trainers)
        this.rooms[roomId].updateLeaderBoard();
        // this.rooms[roomId].numberOfTrainers++;
        this.notifyObservers();
    }

    addRoom(room){
        this.rooms[room.id] = room;
        this.notifyObservers();
    }

    getRoom(roomId){
        return this.rooms[roomId];
    }

    async newRound(roomId) {
        await this.rooms[roomId].newRound();
        this.notifyObservers();
    }

    // Returns [boolean, string]
    guess(roomId, name, trainerId) {
        const guess = this.rooms[roomId].guess(name, trainerId);
        this.notifyObservers();
        return guess;
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