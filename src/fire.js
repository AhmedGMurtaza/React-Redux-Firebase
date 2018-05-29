import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAwHs-mMNmPUOsvWoOtstdzqwTvHt35hlg",
    authDomain: "her-erp.firebaseapp.com",
    databaseURL: "https://her-erp.firebaseio.com",
    projectId: "her-erp",
    storageBucket: "her-erp.appspot.com",
    messagingSenderId: "144807441607"
};
var fire = firebase.initializeApp(config);

export default fire;
