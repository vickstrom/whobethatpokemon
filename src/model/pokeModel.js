import Room from './roomModel';
import { DatabaseHandler } from '../utils/database-handler';

export default class PokeModel{
    constructor(trainers={}, rooms={})
    {
        this.databaseHandler = new DatabaseHandler();
        this.setTrainers(trainers);
        this.setRooms(rooms);
        this.observers = [];
        this.counter = 0; // Used for generating IDs, remove later (?)
        let dummyRoomId = this.generateId(); // Remove later?
        this.currentRoom = null;
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

    localPlayerSignIn(name, id) {
        this.addNewTrainer(name, id);
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

    joinRoom(roomId) {
        //this.addTrainerToRoom(trainerId, roomId);
        this.currentRoomId = roomId;
        this.currentRoom = new Room(this.databaseHandler, roomId, "Test");
        this.currentRoom.notifyObservers();
    }

    addTrainerToRoom(trainerId, roomId){
        // Very non-functional atm
        this.rooms[roomId].trainers.push(this.trainers[trainerId]);
        // this.rooms[roomId].numberOfTrainers++;
        this.notifyObservers();
    }

    addRoom(room){
        const rooms = {...this.rooms};
        room.databaseHandler = this.databaseHandler;
        rooms[room.id] = room;
        this.rooms = rooms;
        this.notifyObservers();
    }

    getRoom(roomId){
        return this.rooms[roomId];
    }

    async newRound(roomId) {
        await this.rooms[roomId].newRound();
    }

    // Returns [boolean, string]
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
        this.observers.forEach(cb=> cb(this));
    }

    setUnsubscribeRoomsHandler(unsub_cb) {
        this.unsubRoomsHandler = unsub_cb;        
    }

    unsubscribeToRooms() {
        if (this.unsubRoomsHandler) {
            console.log(this.unsubRoomsHandler)
            this.unsubRoomsHandler(); 
        }  
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