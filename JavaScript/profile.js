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
 
function salesentry(){
document.getElementById("myForm").style.display="block"}
function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }var elements = document.getElementsByClassName("column");

 let v = document.getElementsByClassName("column");

 let j;
 for(j=0;j<v.length;j++){
     v[j].addEventListener("click",function(){
         let content = this.nextElementSibling;
         if (content.style.display==="block"){
            content.style.display = "none";
        }
        else{
            content.style.display = "block";
        }
     });
 }
 
 let count;
 
function registerbutton(){
    let time = document.getElementById("time").value;
    
    let classname = document.getElementById("class").value;
    let subject = document.getElementById("subject").value;
    let mode = document.getElementById("mode").value;
    let amount = document.getElementById("amount").value;
    let salesamount = document.getElementById("salesamount").value;
    let businessvalue = document.getElementById("businessvalue").value;
    let commission = document.getElementById("commission").value;
    let today = new Date();
    count=(today.getDate()+""+today.getMonth()+""+today.getFullYear()+today.getHours()+""+today.getMinutes()+""+today.getSeconds());

    writesales(time,classname,subject,mode,amount,salesamount,businessvalue,commission);

   
}
let mobile = localStorage.getItem("mobile").substring(0,10);
let upline1 = localStorage.getItem("mobile").substring(11,21)+"";
let upline2 = localStorage.getItem("mobile").substring(22);


document.getElementById("mobile").innerText="MOBILE: "+mobile;
let ref = firebase.database().ref('users').child(mobile);
ref.on('child_added', function(snapshot){
    let user="";
    user = snapshot.key;
   if(user.localeCompare("commission")==0);
   else
    document.getElementById(user).innerText=user.toUpperCase()+": "+snapshot.val();
});let user1="",user2="";
document.getElementById("upline").innerText="UPLINE ID: "+upline1+" "+upline2;
/*firebase.database().ref('users').child(upline1).child('username').on('value',function (snapshot){
    user1=snapshot.val();
});

    */

   let commission=0;
   firebase.database().ref('sales').child(mobile).on('child_added',function(snapshot){
    if(snapshot.child("payment").val().localeCompare("unpaid")==0)
    commission+=snapshot.child("commission").val();
   
    firebase.database().ref('users').child(mobile).child("commission").set(commission);

   });
   if(upline1.length) {
  let name= firebase.database().ref('users').child(upline1).child('username');
  name.on('value', function(snapshot){
    let user="";
    user = snapshot.val();
       user1=user;
       
       document.getElementById("uplinename").innerText = "UPLINE NAME: "+user1+" "+user2;

 });
 let commission=0;
 firebase.database().ref('sales').child(upline1).on('child_added',function(snapshot){
     if(snapshot.child("payment").val().localeCompare("unpaid")==0)
  commission+=snapshot.child("commission").val();
  firebase.database().ref('users').child(upline1).child("commission").set(commission);

 });
 if(upline2.length)
 {
 name= firebase.database().ref('users').child(upline2).child('username');
  name.on('value', function(snapshot){
    let user="";
    user = snapshot.val();
       user2=user;
   document.getElementById("uplinename").innerText = "UPLINE NAME: "+user1+" "+user2;

 });
 let commission=0;
 firebase.database().ref('sales').child(upline2).on('child_added',function(snapshot){
    if(snapshot.child("payment").val().localeCompare("unpaid")==0)
  commission+=snapshot.child("commission").val();
  firebase.database().ref('users').child(upline2).child("commission").set(commission);

 });

}
}


function writesales(time,classname,subject,mode,amount,salesamount,businessvalue,commission){
  // alert(count+'\n'+mobile);
  // alert(time+" "+classname+" "+subject+" "+mode+" "+amount+" "+salesamount+" "+businessvalue+" "+commission);
 count=time+count;   
  firebase.database().ref('sales/'+mobile+'/'+count).set({
        time:time,
        classname:classname,
        subject:subject,
        mode:mode,
        amount:amount,
        salesamount:salesamount,
        businessvalue: businessvalue,
        commission:(commission)*30/100,
        payment:"unpaid"
    });
    
    if(upline1.length){
        firebase.database().ref('sales/'+upline1+'/'+count).set({
            time:time,
            classname:classname,
            subject:subject,
            mode:mode,
            amount:amount,
            salesamount:salesamount,
            businessvalue: businessvalue,
            commission:commission*15/100,
            payment:"unpaid"
        });
      
   
    if(upline2.length){
        firebase.database().ref('sales/'+upline2+'/'+count).set({
            time:time,
            classname:classname,
            subject:subject,
            mode:mode,
            amount:amount,
            salesamount:salesamount,
            businessvalue: businessvalue,
            commission:commission*10/100,
            payment:"unpaid"
        });
        
    }
    }
    
}

function logout(){
    firebase.auth().signOut();
    window.location.href="/index.html"
}












let sales = new Array();

let salesref=firebase.database().ref('sales').child(mobile);
salesref.on('child_added', function(snapshot){
    let user="";
    user = snapshot.key;
    
    sales.push(user);
    let button="";
    
   document.getElementById("saleslist").innerHTML="";
  
   sales.sort();
for(j=0;j<sales.length;j++){
        button = "<button class=\"company\">"+sales[sales.length-1-j]+"</button><div class=\"content\"></div>";
        document.getElementById("saleslist").innerHTML+=button;
   
   
 }
    let list = document.getElementsByClassName("company");



for(j=0;j<list.length;j++){
    list[j].addEventListener("click",function(){
      
        let ref = firebase.database().ref('sales').child(mobile).child(this.innerText);
        let salesdetails="";
        ref.on('child_added', function(snapshot){
            let user="";
            salesdetails += "<li>"+snapshot.key.toUpperCase()+":    "+snapshot.val()+"</li>"
        });
        
        this.nextElementSibling.innerHTML=salesdetails;
        let content = this.nextElementSibling;
        if (content.style.display==="block"){
           content.style.display = "none";
       }
       else{
           content.style.display = "block";
       }
    });
}

});

