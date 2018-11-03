console.log("js loaded");
document.getElementById("signup").addEventListener("click",signup);
document.addEventListener("deviceReady",createDatabase);


var db = "";

function createDatabase(){

  console.log("creating db...");
  db = window.openDatabase("tinder", "1.0", "My WebSQL test database", 5*1024*1024);
  	if(!db) {
  		// Test your DB was created
  		alert('Your DB was not created this time');
  		return false
  	}


    db.transaction(
    		function(tx){
    			// Execute the SQL via a usually anonymous function
    			// tx.executeSql( SQL string, arrary of arguments, success callback function, failure callback function)
    			// To keep it simple I've added to functions below called onSuccessExecuteSql() and onFailureExecuteSql()
    			// to be used in the callbacks
    			tx.executeSql(
    				"CREATE TABLE IF NOT EXISTS user (email TEXT, password TEXT, name TEXT, dateOfBirth DATE, location TEXT)",
    				[],
    				onSuccessExecuteSql,
    				onError
    			)
    		},
    		onError,
    		onReadyTransaction
    	)

}


function signup(){
  var email = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var name = document.getElementById("name").value;
  var dob = document.getElementById("dob").value;
  var loc = document.getElementById("location").value;



}

function onReadyTransaction( ){
		console.log( 'Transaction completed' )
	}
	function onSuccessExecuteSql( tx, results ){
		console.log( 'Execute SQL completed' )
	}
	function onError( err ){
		console.log( err )
	}
