
import { getAuth, signInWithPopup, signInAnonymously, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {ref, set, onValue, get, child} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY, 
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN, 
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET, 
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID, 
  appId: process.env.REACT_APP_FB_APP_ID 
};

export class DatabaseHandler {

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.auth = getAuth();
  }
  
  async setAccountDetails(displayName) {
    return set(ref(this.database, 'users/' + this.user.uid), {
      display_name: displayName
    });
  }

  async getAccountDetails() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `users/${this.user.uid}`));
  }

  async createRoom(userId, title) {
    const ids = this.getRandomdIds(4);
    set(ref(this.database, `rooms/${userId}`), {
        title: title,
        current_guess: {
            guess_id: new Date().getTime(), 
            ids_to_guess_on: ids,
            expected_id: ids[0]
        }
    });
  }

  async subscribeToRoom(roomId) {
    const roomRef = ref(this.database, `rooms/${roomId}`);
    return onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      console.log(roomRef);
    }) 
  }

  async subscribeToRooms(onValueFunction) {
    const roomRef = ref(this.database, `rooms/`);
    return onValue(roomRef, onValueFunction); 
  }

  getRandomdIds(num_ids) {
    const ids = []
    while (ids.length < num_ids) {
        const val = Math.floor(Math.random() * 151 + 1)
        if (ids.filter((v) => v === val).length === 0)
            ids.push(val);
    }
    return ids;
  }

  guess(user_id, guess, guess_id, room_id) {
      set(ref(this.database, `guesses/${user_id}`), {
        guess: guess,
        guess_id:guess_id, 
        room_id: room_id 
      });
  }

  setNewGuess(user_id) {
    const ids = this.getRandomdIds(4);
    set(ref(this.database, `rooms/${user_id}/current_guess`), {
      guess_id: new Date().getTime(), 
      ids_to_guess_on: ids,
      expected_id: ids[0]
    });
  }

  evaluateScores(user_id, expected_id, current_guess_id) {
      const dbRef = ref(this.database);
      get(child(dbRef, `guesses`)).then((snapshot_guesses) => {
        get(child(dbRef, `rooms/${user_id}/players_scores`)).then((snapshot) => {
          let score = {}
          if (snapshot.exists())
            score = snapshot.val()
          let guesses = {};
          if (snapshot_guesses.exists())
            guesses = snapshot_guesses.val();
          Object.keys(guesses).forEach(player_id => {
            if (guesses[player_id].room_id === user_id) {
              let correct_answer = false;
              if (guesses[player_id].guess === expected_id && guesses[player_id].guess_id === current_guess_id)
                correct_answer = true;
              if (player_id in score) {
                score[player_id] = score[player_id] + (correct_answer ? 1 : 0);
              }
              else {
                score[player_id] = (correct_answer ? 1 : 0);
              }
            }
          });
          set(ref(this.database, `rooms/${user_id}/players_scores`), score);
        }).catch((error) => {
          console.error(error);
        });
      });
  }

  async joinRoom (userId, roomId) {
      set(ref(this.database, 'rooms/' + roomId + "/players/" + userId), {
          guess: ""
      });
  }

  async loginAsAnonymous(call) {
    const user_cred = await signInAnonymously(this.auth);
    this.user = user_cred.user;
    console.log(this.user);
    console.log(this.user);
    console.log(this.user);
    return user_cred;
    
  }



}













//signInAnonymously(auth)
 // .then((res) => {
      //createRoom(res.user.uid, 3);
      //guess(res.user.uid, 2, 1638534876323, "")
      //evaluateScores(res.user.uid, 2, 1638534876323);;
      //setNewGuess(res.user.uid);
      //const unsubcribe = subscribeToRoom();
      //const unsub2 = subscribeToRooms();
  //})
  //.catch((error) => {
    //const errorCode = error.code;
    //const errorMessage = error.message;
  //});



