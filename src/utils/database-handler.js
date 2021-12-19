
import { getAuth, signInAnonymously} from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import {ref, set, onValue, get, child} from "firebase/database";
import { getRandomdIds, between } from './utils';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY, 
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN, 
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET, 
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID, 
  appId: process.env.REACT_APP_FB_APP_ID 
};

const TIME_BETWEEN_EACH_ROUND = 10;

export class DatabaseHandler {

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.auth = getAuth();
  }
  
  async setAccountDetails(displayName, avatarId) {
    return set(ref(this.database, 'users/' + this.user.uid), {
      display_name: displayName,
      avatar_id: avatarId
    });
  }

  async getAccountDetails() {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `users/${this.user.uid}`));
  }

  async getTrainerDetails(userId) {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `users/${userId}`));
  }
  
  async createRoom() {
    const ids = getRandomdIds(4, 151);
    return set(ref(this.database, `rooms/${this.user.uid}`), {
        current_guess: {
            round_id: Date.now(), 
            ids_to_guess_on: ids,
            expected_id: ids[between(0, 4)],
            ending_at_time: Date.now() + (TIME_BETWEEN_EACH_ROUND * 1000),
            player_scores: {}
        }
    });
  }

  async getRoom(roomId) {
    const dbRef = ref(this.database);
    return get(child(dbRef, `rooms/${roomId}`));
  }

  async subscribeToRoom(roomId, onSnapchot) {
    const roomRef = ref(this.database, `rooms/${roomId}`);
    return onValue(roomRef, onSnapchot);
  }

  async subscribeToRooms(onValueFunction) {
    const roomRef = ref(this.database, `rooms/`);
    return onValue(roomRef, onValueFunction); 
  }

  async guess(guess_id, round_id, room_id) {
      return set(ref(this.database, `guesses/${this.user.uid}`), {
        guess: guess_id,
        round_id: round_id, 
        room_id: room_id 
      });
  }

  async startNewRound() {
    const ids = getRandomdIds(4, 151);
    return set(ref(this.database, `rooms/${this.user.uid}/current_guess`), {
      round_id: new Date().getTime(), 
      ids_to_guess_on: ids,
      expected_id: ids[between(0, 4)],
      ending_at_time: Date.now() + (TIME_BETWEEN_EACH_ROUND * 1000)
    });
  }

  async evaluateScores(expected_id, round_id) {
    const user_id = this.user.uid;
      const dbRef = ref(this.database);
      return get(child(dbRef, `guesses`)).then((snapshot_guesses) => {
        return get(child(dbRef, `rooms/${user_id}/players_scores`)).then((snapshot) => {
          let score = {}
          if (snapshot.exists())
            score = snapshot.val()
          let guesses = {};
          if (snapshot_guesses.exists())
            guesses = snapshot_guesses.val();
          Object.keys(guesses).forEach(player_id => {
            if (guesses[player_id].room_id === user_id && guesses[player_id].round_id === round_id)  {
              let correct_answer = false;
              if (guesses[player_id].guess === expected_id && guesses[player_id].round_id === round_id)
                correct_answer = true;
              if (player_id in score) {
                score[player_id] = score[player_id] + (correct_answer ? 1 : 0);
              }
              else {
                score[player_id] = (correct_answer ? 1 : 0);
              }
            }
          });
          return set(ref(this.database, `rooms/${user_id}/players_scores`), score);
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
    const user_info = await signInAnonymously(this.auth);
    this.user = user_info.user;
    return this.user;
  }
}
