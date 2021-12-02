class PokeModel{
    constructor(trainers=[], rooms=[])
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
        this.trainers = [...this.trainers].push(trainer)
    }

    addTrainerToRoom(trainer, roomId){
        const trainer = this.trainers.find(trainer => trainer.id === trainerId)
        const room = this.rooms.find(room => room.id === roomId)
        const trainers = [...room.trainers].push(trainer)
        const newRoom = Object.assign
    
        this.rooms = [...this.rooms].filter(room => room.id === id)
    }


    addRoom(room){
        this.rooms = [...this.rooms].push(room)
    }
}
