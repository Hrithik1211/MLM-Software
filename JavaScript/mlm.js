var button="";

var col =  document.getElementsByClassName("menu");
var j;
var userlevel="";




  // Your web app's Firebase configuration
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
 
  profileclick();
 /*
button="";
for(j=1;j<5;j++){
    button+="<button class=\"companylevel1\">MLM User "+j+"</button><button class=\"user1\" onclick=\"openForm1()\">Add User</button>"
    +"<div id=\"level"+j+"user\" >This is mlm software user </div>";
    
}*/
// document.getElementById("level1").innerHTML=button+document.getElementById("level1").innerHTML;

for(j=0;j<col.length;j++){
    
    col[j].addEventListener("click",function(){
        this.classList.toggle("active");
        var content = document.getElementById("level1");
        if (content.style.display==="block"){
            content.style.display = "none";
        }
        else{
            content.style.display = "block";
        }
    });
}





  


/*
for(j=1;j<5;j++){
    button+="<button class=\"companylevel1\">MLM Software Level1 User "+j+"</button><button class=\"user1\" onclick=\"openForm1()\">Add User</button>"
    +"<div id=\"level"+j+"user\" >This is mlm software user "+j+"</div>";
}
*/


var level1user="";
var level2user="";
function openForm() {
    document.getElementById("myForm").style.display = "block";
   userlevel = "company";
}
function openForm1(clickedid) {
    document.getElementById("myForm").style.display = "block";
    userlevel = "Level1";
    level1user=clickedid;
    






    
}




















function openForm2(clickedid) {
    document.getElementById("myForm").style.display = "block";
    userlevel="Level2";
    level1user=clickedid.substring(0,10);
    level2user=clickedid.substring(10);
}


function writeUserData(level,mobile, name, email,partnerid) {
    firebase.database().ref('users/' + mobile ).set({
      username: name,
      email: email,
      partnerid:partnerid
     // organisation: companyname
    });
    if(userlevel.localeCompare("company")==0)
   {
         firebase.database().ref(level+'/'+mobile).set(level);

    }
    if(userlevel.localeCompare("Level1")==0){
        firebase.database().ref('company'+'/'+level1user+'/'+mobile).set(level);
        firebase.database().ref('users'+'/'+mobile+'/'+'upline').set(level1user);
        
    }
    if(userlevel.localeCompare("Level2")==0){
        firebase.database().ref('company'+'/'+level1user+'/'+level2user+'/'+mobile).set(level);
        firebase.database().ref('users'+'/'+mobile+'/'+'upline').set(level2user+" "+level1user);
        
    }
    alert("New User Added")
    
  }



  


  
function registerbutton(){
    var username = document.getElementById("username").value;
   // var companyname = document.getElementById("companyname").value;
    var mobile = document.getElementById("mobilenumber").value;
    var email = document.getElementById("psw").value;
    var partnerid = document.getElementById("partnerid").value;
    
 if(username.length&&mobile.length&&email.length&&partnerid.length)
    writeUserData(userlevel,mobile,username,email,partnerid);
    
}


  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }



function commission(){
    window.location.href = "/commission.html"
}
function level1button(mobile){
  
  localStorage.setItem("mobile",mobile);
    window.location.href="/profile.html"
    
}
function logout(){
    firebase.auth().signOut();
    window.location.href="/login.html"
}
let users = new Array()  ;
function profileclick(){
    
  
   
    var heading = document.getElementById("mlmheading");
    var ref =  firebase.database().ref().child('text');
 document.getElementById("level1").innerHTML="" 
    ref.on('value',function(snapshot){
        heading.innerText=(snapshot.val());
    });
  
    var userName="";
    ref = firebase.database().ref('company');
    button=""; 
   
    ref.on('child_added', function(snapshot){
          userName = snapshot.key;
      //     if(userName.startsWith(searchname))
   {
      
          button+="<button class=\"menulevel1\" >Menu</button><button id=\""+userName+"\" onclick=\"level1button(this.id)\" class=\"companylevel1\">"+userName+"</button><button id=\""+userName+"\"class=\"user1\" onclick=\"openForm1(this.id)\">Add User</button>"
      +"<div id=\"level"+j+"user\" >This is mlm software user </div><br>";
      
      }
      document.getElementById("level1").innerHTML=button;
     
      var col1=document.getElementsByClassName("menulevel1");
  
      for(j=0;j<col1.length;j++){
          col1[j].nextElementSibling.nextElementSibling.nextElementSibling.style.display="none";
          col1[j].addEventListener("click",function(){
              this.classList.toggle("active");
              
  
              
      
      
           var content = this.nextElementSibling.nextElementSibling.nextElementSibling;
           content.innerHTML="";   
           var buttonlevel2="";var str=this.nextElementSibling.innerText+"";
              let level=this.nextElementSibling.innerText;
              var data = firebase.database().ref('company').child(this.nextElementSibling.innerText);
              data.on('child_added',function(snapshot){
                  let user = snapshot.key;
        //          if(user.startsWith(searchname))
                  {
                      buttonlevel2="<button class=\"menulevel2\">Menu</button><button id=\""+user+" "+level+"\" class=\"companylevel2\"onclick=\"level1button(this.id)\" >"+user+"</button><button class=\"user2\" id=\""+str+snapshot.key+"\" onclick=\"openForm2(this.id)\">Add User</button>"
                      +"<div id=\"level"+j+"user\" ></div>";
          //            users.push(buttonlevel2);
                  } content.innerHTML += buttonlevel2;
              });
 //     buttonlevel2="<input type=\"search\" id=\"search\" placeholder=\"Search\"><br><br>"+buttonlevel2;
             
              if (content.style.display==="block"){
                  content.style.display = "none";
              }
              else{
                  content.style.display = "block";
              }
              var col2 = document.getElementsByClassName("menulevel2");
              for(var l=0;l<col2.length;l++){
                  col2[l].addEventListener("click",function(){
                      this.classList.toggle("active");
                      var con = this.nextElementSibling.nextElementSibling.nextElementSibling;
                      con.innerHTML="";
                      var buttonlevel3="";
                      var dat = firebase.database().ref('company').child(str).child(this.nextElementSibling.innerText.substring(0,10));
                      let level = this.nextElementSibling.innerText;
                      dat.on('child_added',function(snapshot){
                      let user=snapshot.key;
            //          if(user.startsWith(searchname))
                      {
                        buttonlevel3="<button id=\""+user+" "+level+" "+str+"\" onclick=\"level1button(this.id)\" class=\"companylevel3\">"+user+"</button><button class=\"user3\" id=\""+str+snapshot.key+"\" onclick=\"openForm2(this.id)\">Add User</button>"
                          +"<div id=\"level"+j+"user\" ></div>";
              //          users.push(buttonlevel3)
              con.innerHTML+=buttonlevel3; 
                        }
                  });
            //  buttonlevel3="<input type=\"search\" id=\"search\" placeholder=\"Search\"><br><br>"+buttonlevel3;
     
                  
                  if (con.style.display==="block"){
                      con.style.display = "none";
                  }
                  else{
                      con.style.display = "block";
                  }
  
          
  
                  });
              }
          });
      }
        //var button="";
    });
}
function searchbutton(){
    let username = ""+document.getElementById("search").value;
    users = new Array();
    if(username.length){
        document.getElementById("level1").innerHTML="";
    firebase.database().ref('users').on('child_added',function(snapshot){
        if(snapshot.key.startsWith(username)){
            let upline = snapshot.child("upline").val();
            document.getElementById("level1").innerHTML+="<button id=\""+snapshot.key+" "+upline+"\" class=\"searchlist\"onclick=\"level1button(this.id)\" >"+snapshot.key+"</button>";
        }
    });}
    else
    profileclick()
}