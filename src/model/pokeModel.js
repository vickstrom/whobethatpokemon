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
        console.log('epic trainer added');
        console.log(this.trainers);
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
        this.addTrainerToRoom(trainerId, roomId);
        this.currentRoomId = roomId;
    }

    addTrainerToRoom(trainerId, roomId){
        // Very non-functional atm
        console.log('current room:', this.rooms[roomId]);
        console.log('rooms', this.rooms);
        console.log('roomId', roomId);
        this.rooms[roomId].trainers.push(this.trainers[trainerId]);
        // this.rooms[roomId].numberOfTrainers++;
        this.notifyObservers();
        console.log(this.rooms);
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

    guess(roomId, name) {
        return this.rooms[roomId].guess(name);
    }

    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){
        this.observers = this.observers.filter(observer => observer != callback);
    }

    notifyObservers(){
        console.log('observers', this.observers);
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