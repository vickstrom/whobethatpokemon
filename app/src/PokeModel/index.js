export default class PokeModel{
    constructor(trainers={}, rooms={})
    {
        this.setTrainers(trainers);
        this.setRooms(rooms);
    }

    setRooms(rooms){
        this.rooms = rooms;
    }

    setTrainers(trainers){
        this.trainers = trainers;
    }

    addNewTrainer(trainer){
        this.trainers = [...this.trainers].push(trainer);
        //this.notifyObservers();
    }
    
    updateLeaderBoard(){
        const leaderBoard = Object.values(this.trainers).map(trainer => {return {name: trainer.name, points: trainer.points}}).sort(compareScore);
        this.leaderBoard = leaderBoard;
        //this.notifyObservers;
    }

    addTrainerToRoom(trainer, roomId){
        const newRooms = [...this.rooms];
        newRooms[roomId].trainers[trainer.id] = trainer;
        newRooms[roomId].numberOfTrainers ++;
        this.rooms = newRooms;
        //this.notifyObservers();
    }

    setAnswer(roomId, trainerId, answer){
        const newRooms = [...this.rooms];
        newRooms[roomId].trainers[trainerId].answer = answer;
        this.rooms = newRooms;
        //this.notifyObservers();
    }

    checkAnswer(roomId, trainerId, correct_answer){
        const newRooms = [...this.rooms];
        if(newRooms[roomId].trainers[trainerId].answer === correct_answer){
            newRooms[roomId].trainers[trainerId].correct = true;
            this.rooms = newRooms;
            this.increasePoints(roomId,trainerId,1);
            
        }else{
            newRooms[roomId].trainers[trainerId].correct = false;
        }
        //this.notifyObservers();
    }

    increasePoints(roomId, trainerId, points=1){
        const newRooms = [...this.rooms];
        const newTrainers = [...this.trainers];
        newRooms[roomId].trainers[trainerId].points += points;
        newTrainers[trainerId].points += points;
        this.rooms = newRooms;
        this.trainers = newTrainers;
        //this.notifyObservers();
    }

    addRoom(room){
        this.rooms = [...this.rooms].push(room);
        //this.notifyObservers();
    }

    

    addObserver(callback){
        this.observers = [...this.observers].push(callback);
    }
    removeObserver(callback){
        this.observers = [...this.observers].filter(observer => observer !== callback);
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