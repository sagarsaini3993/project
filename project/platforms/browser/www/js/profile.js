//------initiate database---------//
document.addEventListener("deviceReady", connectToDatabase);
document.getElementById("edit").addEventListener("click", editButton);
var inputName = 0;
var inputPassword = 0;
var inputMail = 0;
var inputDOB  = 0;
var inputLocation = 0;
var db = null;
var mail = localStorage.getItem("mail");
function editButton() {
    //alert("login pressed");
    window.location.replace("edit.html"); 
  }
  
function displayResults( tx, results ){
  document.getElementById("resultsSection").innerHTML ="";
    if(results.rows.length == 0) {
            alert("No records found");
            return false;
        }
 
        var row = "";
        for(var i=0; i<results.rows.length; i++) {
      document.getElementById("resultsSection").innerHTML +=
          "<p> Name: "
        +   results.rows.item(i).name
        + "<br>"
        + "Date of Birth: "
        +   results.rows.item(i).birthdate
        + "<br>"
        + "Location: "
        +   results.rows.item(i).location
          + "<br>"
        + "Email: "
        +   results.rows.item(i).email
        + "<br>"
        + "Password: "
        +   results.rows.item(i).password
        + "<br>"
         + "Description: "
        +   results.rows.item(i).description
        + "<br>"
       + "<br>"
        + "</p>";
     
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
                 "SELECT * FROM user where email = ?",
            [mail],
            displayResults,
            onError
            )
        },
        onError,
        onReadyTransaction
    )

}


