
document.addEventListener("deviceReady", connectToDatabase);
var slider_content = document.getElementById("box");
document.getElementById("nextButton").addEventListener("click", nextImage);
document.getElementById("prewButton").addEventListener("click", prewImage);
var db = null;
var b =1;
var slideIndex = 1;
var totalLength = 1;
var results = "";

var image = [];
var h = 0;


function nextImage(){
  if (h<image.length){
    h=h+1;
  }
  else{
    h=1;
  }
  display(h);
  //slider_content.innerHTML = "<img src='im"+image[h-1]+".jpg";
}
function prewImage(){
  if (h<image.length+1){
    if (h>1){
    h=h-1;
  }
}
  else{
    h=image.length;
  }
  //slider_content.innerHTML = "<img src"+image+".jpg";
display(h);
}
function display(n) {
  slider_content.innerHTML = "<img src=img/"+ image[n].img1;

}

function selectProfile() {
    //alert("login pressed");
    localStorage.setItem("entry",1);
   
    db.transaction(
      function(tx){
        
          tx.executeSql(
            "SELECT * FROM profile",
            [],
            displayResults,
            onError
          )
      },
      onError,
      onReadyTransaction
    ) 
  }
  function displayResults( tx, results ){
    totalLength = results.rows.length;
    if(results.rows.length == 0) {
            alert("no record found");
            window.location.replace("index.html"); 
            return false;
      }
 
      var row = "";
      var m = "img/";
     // if( b<=results.rows.length) {
        for(var i=0; i<results.rows.length; i++) {
          image[i] = results.rows.item(i);
          totalLength++;
      h = i;
      // localStorage.setItem("entry", 1);
      // var filename= results.rows.item(i).img1;
      //  var image = document.getElementById("photoPlaceholder");
      //  alert(m+filename);
      //  image.src = m+filename;
       
      //  document.getElementById("resultsSection").innerHTML +=
      //     "<p> Name: "
      //   +   results.rows.item(i).name
      //   + "<br>"
      //   + "Date of Birth: "
      //   +   results.rows.item(i).birthdate
      //   + "<br>"
      //   + "Location: "
      //   +   results.rows.item(b).location
      //   + "</p>";
     
        }

 
      //window.location.replace("profile.html"); 
    }

  function onReadyTransaction(){
    console.log( 'Transaction completed' )
  }
  function onSuccessExecuteSql( tx, results ){
    console.log( 'Execute SQL completed' );
    localStorage.setItem("entry", 1);
  }
  function onError( err ){
    console.log( err )
  }

function connectToDatabase() {
  console.log("device is ready - connecting to database");
 

  // 2. open the database. The code is depends on your platform!
  if (window.cordova.platformId === 'browser') {
    console.log("browser detected...");
    // For browsers, use this syntax:
    //  (nameOfDb, version number, description, db size)
    // By default, set version to 1.0, and size to 2MB
    db = window.openDatabase("cestar", "1.0", "Database for Cestar College app", 3*1024*1024);
  }
  else {
    alert("mobile device detected");
    console.log("mobile device detected!");
    var databaseDetails = {"name":"cestar.db", "location":"default"}
    db = window.sqlitePlugin.openDatabase(databaseDetails);
    console.log("done opening db");
  }

  if (!db) {
    alert("databse not opened!");
    return false;
  }

db.transaction(
        function(tx){
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS profile(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, birthdate TEXT, location TEXT, contact TEXT, img1 TEXT, img2 TEXT, img3 TEXT)",
                [],
                insertProfile,
                onError
            )
        },
        onError,
        onReadyTransaction
    )

}
function insertProfile(){
  if (localStorage.getItem("entry") != 1){
    alert(localStorage.getItem("entry"));
  db.transaction(
        function(tx){
            tx.executeSql(
                "INSERT INTO profile(name, birthdate, location, contact, img1, img2, img3) VALUES('raman','1/1/1994','toronto','6474000472','pic1-1.jpg','pic1-2','pic1-3'), ('taylor','2/3/1994','toronto','6474000472','pic2-1.jpg','pic2-2','pic2-3'),('lyon','1/1/1990','toronto','6474000472','pic3-1.jpg','pic3-2','pic3-3'),('lily','1/2/1988','brampton','6474000472','pic4-1','pic1-2','pic1-3')",
                [],
                selectProfile,
                onError
            )
        },
        onError,
        onReadyTransaction
    )
 }
}


