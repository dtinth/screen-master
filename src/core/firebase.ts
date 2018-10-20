import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyBABbwayW04Ct_yat0zaM9gdTrGAsSdyVg',
  authDomain: 'screen-master-a49e9.firebaseapp.com',
  databaseURL: 'https://screen-master-a49e9.firebaseio.com',
  projectId: 'screen-master-a49e9',
  storageBucket: 'screen-master-a49e9.appspot.com',
  messagingSenderId: '470155873219'
}

firebase.initializeApp(config)

export { firebase }
