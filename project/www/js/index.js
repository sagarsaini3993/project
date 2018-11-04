document.addEventListener("deviceReady", connectToDatabase);
document.getElementById("login").addEventListener("click", loginButton);
//document.getElementById("showButton").addEventListener("click", showButton);
var n = 0;
var d = 0;
var db = null;
// function showButton() {
//     //var name = document.getElementById("nameBox").value;
//     alert("you preessed show");
    
// }
function loginButton() {
    console.log("you pressed login");
    alert("login pressed");
    //var dept = document.getElementById("deptBox").value;
    n = document.getElementById("email").value;
    d = document.getElementById("password").value;
    console.log(n + d);
    alert(n + d);
    db.transaction(
        function(tx){
            // Execute the SQL via a usually anonymous function 
            // tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
            // To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
            // to be used in the callbacks
            tx.executeSql(
                "SELECT * FROM user where email = ? AND password = ?",
                [n,d],
                displayResults,
                onError
            )
        },
        onError,
        onReadyTransaction
    )
    
}
function errorResult(){
   alert("Enter valid username and password");
}
function displayResults( tx, results ){
 
    if(results.rows.length == 0) {
            alert("No records found");
            return false;
        }
 
        var row = "";
        for(var i=0; i<results.rows.length; i++) {
        name = results.rows.item(i).email;
       
        password = results.rows.item(i).password;
        alert(name + password);

       localStorage.setItem("mail", name);
       localStorage.setItem("password", password);
       window.location.replace("profile.html");
     
        }

 
    }
 
 
 

//1. push button
// 2. get things from input box
// 3. put things into database



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
            // Execute the SQL via a usually anonymous function 
            // tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
            // To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
            // to be used in the callbacks
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, name TEXT, birthdate TEXT, location TEXT)",
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
  db.transaction(
        function(tx){
            // Execute the SQL via a usually anonymous function 
            // tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
            // To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
            // to be used in the callbacks
            tx.executeSql(
                "INSERT INTO user(email, password, name, birthdate, location) VALUES('sagar@gmail.com','sagar11', 'sagar','1/1/1994','toronto'),('sukh@gmail.com','sukh11', 'sukhwinder','2/2/1994','brampton'),('raman@gmail.com','raman11', 'raman','3/3/1994','toronto')",
                [],
                onSuccessExecuteSql,
                onError
            )
        },
        onError,
        onReadyTransaction
    )

}


