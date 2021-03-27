import { initializeApp, auth, storage, database } from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyA3YDairAP8eI3uilxxTYQl9bfvQJ59rI4",
    authDomain: "polls-9acff.firebaseapp.com",
    projectId: "polls-9acff",
    databaseURL: "https://polls-9acff-default-rtdb.firebaseio.com/",
    storageBucket: "polls-9acff.appspot.com",
    appId: "1:497226188154:web:382572e28046739ccb02c3",
};

initializeApp(config);

export const authentication = auth();
export const firebaseDataBase = database();
export const firebaseStorage = storage();
