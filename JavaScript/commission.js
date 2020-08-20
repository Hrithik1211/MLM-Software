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
  customercommission();
 function customercommission()
  { let j;
  let commission
  let users = new Array();
 let ref = firebase.database().ref('users');
{
  ref.on('child_added',function(snapshot){
    

   persondata="<button class=\"buttoncommission\" id=\""+snapshot.key+"\" onclick=\"payment(this.id)\">"+"NAME: "+snapshot.child("username").val() +"\tMOBILE: "+snapshot.key+'\n'+snapshot.child("commission").val() +"</button>"; 
   document.getElementById("listdisplay").innerHTML+=persondata;    
});}
}
function payment(mobile){
    let paymentid=""+prompt("Enter Payment Id");
    if(paymentid.localeCompare("null"))
    if(paymentid.length){
        alert(paymentid.length)
        firebase.database().ref('sales').child(mobile).on('child_added',function(snapshot){
            firebase.database().ref('sales').child(mobile).child(snapshot.key).child("payment").set("paid");
        });
        firebase.database().ref('users').child(mobile).child('commission').set("paid");
        document.getElementById("listdisplay").innerHTML=""
        customercommission()
    }
}