import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyAqEYhEbMKrwh5eVHWg5OC9Ur0FqWzvn3c',
    authDomain: 'exitpoll-032019.firebaseapp.com',
    databaseURL: 'https://exitpoll-032019.firebaseio.com',
    projectId: 'exitpoll-032019',
    storageBucket: 'exitpoll-032019.appspot.com',
    messagingSenderId: '730406529437'
};

firebase.initializeApp(config);

export const authentication = firebase.auth();
export const firebaseDataBase = firebase.database();
