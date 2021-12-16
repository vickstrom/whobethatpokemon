import Room from './roomModel';
import { DatabaseHandler } from '../utils/database-handler';

export default class PokeModel{
    constructor(trainers={}, rooms={})
    {
        this.databaseHandler = new DatabaseHandler();
        this.observers = [];
        this.currentRoom = null;
        this.userId = null;
        this.account = null;
    }

    async anonymousLogin() {
        const user = await this.databaseHandler.loginAsAnonymous();
        this.userId = user.uid;
    }

    async loadAccountDetails() {
        const account = await this.databaseHandler.getAccountDetails();
        if (account.exists()) {
            this.account = account;
            return true;
        } else {
            return false;
        }
    }

    signedIn() {
        if (this.account) {
            return true;
        } else {
            return false;
        }
    }

    async createAnonymousAccount(name, avatarId) {
        await this.databaseHandler.setAccountDetails(name, avatarId);
        await this.loadAccountDetails();
    }

    async createRoom() {
        await this.databaseHandler.createRoom();
    }

    joinRoom(roomId, isAdmin=false) {
        this.currentRoomId = roomId;
        this.currentRoom = new Room(this.databaseHandler, roomId, "Test", isAdmin);
        this.currentRoom.notifyObservers();
    }

    async roomExists(roomId){
        const roomSnap = await this.databaseHandler.getRoom(roomId)
        return roomSnap.exists();
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
