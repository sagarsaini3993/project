//------initiate database---------//
document.addEventListener("deviceReady", connectToDatabase);
document.getElementById("login").addEventListener("click", loginButton);
var inputName = 0;
var inputPassword = 0;
var db = null;

function loginButton() {
    //alert("login pressed");
    inputName = document.getElementById("email").value;
    inputPassword = document.getElementById("password").value;
    // alert(inputName + inputPassword);
    db.transaction(
      function(tx){

          tx.executeSql(
            "SELECT * FROM user where email = ? AND password = ?",
            [inputName,inputPassword],
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
            alert("Please enter valid username and password");
            window.location.replace("index.html");
            return false;
      }

      var row = "";
      for(var i=0; i<results.rows.length; i++) {
      name = results.rows.item(i).email;

      password = results.rows.item(i).password;
      // alert(name + password);

      localStorage.setItem("mail", name);
      localStorage.setItem("password", password);
      localStorage.setItem("userEntry", 1);
// <<<<<<< HEAD
      // window.location.replace("home.html"); 
// =======
      window.location.replace("profile.html");
// >>>>>>> 2aca83a9f076b1e906d4ff44360c8ca283e2fd66
    }
  }

  function onReadyTransaction(){
    console.log( 'Transaction completed' )
  }
  function onSuccessExecuteSql( tx, results ){
    console.log( 'Execute SQL completed' );
    localStorage.setItem("userEntry", 1);
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
                "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, birthdate TEXT, location TEXT, description TEXT)",
                [],
                insertUser,
                onError
            )
        },
        onError,
        onReadyTransaction
    )

}
function insertUser(){
  if (localStorage.getItem("userEntry") != 1){
    alert(localStorage.getItem("userEntry"));
  db.transaction(
        function(tx){
            tx.executeSql(
                "INSERT INTO user(email, password, name, birthdate, location, description) VALUES('sagar@gmail.com','sagar11', 'sagar','1/1/1994','toronto','lambton college'),('sukh@gmail.com','sukh11', 'sukhwinder','2/2/1994','brampton','ww'),('raman@gmail.com','raman11', 'raman','3/3/1994','toronto','e')",
                [],
                onSuccessExecuteSql,
                onError
            )
        },
        onError,
        onReadyTransaction
    )
 }
}
