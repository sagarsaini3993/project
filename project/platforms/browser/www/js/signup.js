//------initiate database---------//
document.addEventListener("deviceReady", connectToDatabase);
document.getElementById("signup").addEventListener("click", signupButton);
var inputName = 0;
var inputPassword = 0;
var inputMail = 0;
var inputDOB  = 0;
var inputLocation = 0;
var db = null;
function signupButton() {
    //alert("login pressed");
    inputMail = document.getElementById("email").value;
    inputPassword = document.getElementById("password").value;
    inputName = document.getElementById("name").value;
    inputDOB = document.getElementById("dob").value;
    inputLocation = document.getElementById("location").value;
    alert(inputName ,inputPassword, inputName, inputDOB,inputLocation);
    db.transaction(
      function(tx){
        
          tx.executeSql(
            "SELECT email FROM user where email = ?",
            [inputMail],
            displayResults,
            onError
          )
      },
      onError,
      onReadyTransaction
    ) 
  }
  function displayResults( tx, results ){
    if(results.rows.length == 0) {
           alert("new user")
            insertUser();
            window.location.replace("index.html"); 
      }
      else{
         alert("Email already exist");

      }
 
  }

  function onReadyTransaction(){
    console.log( 'Transaction completed' )
  }
  function onSuccessExecuteSql( tx, results ){
    console.log( 'Execute SQL completed' );
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
                "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, birthdate TEXT, location TEXT)",
                [],
                onSuccessExecuteSql,
                onError
            )
        },
        onError,
        onReadyTransaction
    )

}
function insertUser(){
  db.transaction(
        function(tx){
            tx.executeSql(
                "INSERT INTO user(email, password, name, birthdate, location)  VALUES(?,?,?,?,?)",
                [inputMail, inputPassword,inputName, inputDOB,inputLocation],
                onSuccessExecuteSql,
                onError
            )
        },
        onError,
        onReadyTransaction
    )

}

