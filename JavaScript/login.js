var firebaseConfig = {
     apiKey: "AIzaSyC8cmIQbKIMNhEnNgeoFN7w4gNJBirSFM4",
    authDomain: "mlmsw-83741.firebaseapp.com",
    databaseURL: "https://mlmsw-83741.firebaseio.com",
    projectId: "mlmsw-83741",
    storageBucket: "mlmsw-83741.appspot.com",
    messagingSenderId: "993714721375",
    appId: "1:993714721375:web:629775883606b243dd01ea",
    measurementId: "G-00MK9NX1W7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




  firebase.analytics();
 function login(){
     let email = document.getElementById("email").value;
     let password = document.getElementById("password").value;
     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
 }
 firebase.auth().onAuthStateChanged(function(user) {
     
    if (user) {
      // User is signed in.
      window.location.href="/mlm.html"
   
      var displayName = user.displayName;
      var email = user.email+"";
      
      window.location.href="/mlm.html"
   

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;


      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
  function register(){
      document.getElementById("heading").innerText="Register";
      document.getElementById("login").style.display="none";
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
       
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
  }