//------initiate database---------//
document.addEventListener("deviceReady", connectToDatabase);
document.getElementById("update").addEventListener("click", updateButton);
document.getElementById("takePhotoButton").addEventListener("click", takePhoto);

var inputName = 0;
var inputPassword = 0;
var inputMail = 0;
var inputDOB  = 0;
var inputLocation = 0;
var db = null;
var mail = localStorage.getItem("mail");
 document.getElementById("userid").innerHTML = mail;
// alert("email id " +mail);

  
function displayResults( tx, results ){
  
    if(results.rows.length == 0) {
            alert("No records found");
            return false;
        }
 
        var row = "";
        for(var i=0; i<results.rows.length; i++) {
          // alert(results.rows.item(i).name);

          document.getElementById("name").value = results.rows.item(i).name;
          document.getElementById("location").value = results.rows.item(i).location;
          document.getElementById("description").value = results.rows.item(i).description;
          document.getElementById("password").value = results.rows.item(i).password;
          document.getElementById("dob").value = results.rows.item(i).birthdate;
        }
 
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

function updateButton() {
    console.log("update button clicked");
alert("update button clicked");
// alert("email id " +mail);

var name= document.getElementById("name").value;
var location= document.getElementById("location").value;
var description= document.getElementById("description").value;
var password= document.getElementById("password").value;
var dob= document.getElementById("dob").value;
console.log(name);
alert(name);
// alert(location);
// alert(description);
db.transaction(

        function(tx){
          tx.executeSql(
             "UPDATE user set name=?, location=?, description=?, password=?, birthdate=? where email = ?",
            [name,location,description,password,dob,mail],
            onSuccessExecuteSql,
            onError
             )
        },
        onError,
        onReadyTransaction
    )
    window.location.replace("profile.html"); 
  }


  // =======take photo===========================
  function takePhoto() {
    // 1. choose options for the camera
    var cameraOptions = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE
    };

   navigator.camera.getPicture(onSuccess, onFail, cameraOptions);
}

//=====================
function onReadyTransaction(){
    console.log( 'Transaction completed' )
  }
  function onSuccessExecuteSql( tx, results ){
    console.log( 'Execute SQL completed' );
  }
  function onSuccess(filename)
  {

    // DEBUG: Show the original file name
  
  console.log("Image path: "  + filename);
  alert("Image path: "  + filename);

  // ---------
  if (window.cordova.platformId == "android") {
    // if you are using android, you need to do some extra steps
    // to ensure you have the "real" image file path
    // Note: you need to install this plugin: cordova-plugin-filepath
    // for it to work properly
    window.FilePath.resolveNativePath(filename, function(result) {
      imageURI = result;
      alert("Successfully converted image path: " + result);

      localStorage.setItem("photo", result);

      var image = document.getElementById("photoContainer");
      image.src = result;

    }, function (error) {
      alert("error when converting file path!");
    });
  }
  else {
    // show image in UI
    // show the image in the user interface
    var imageBox = document.getElementById("photoContainer");
    imageBox.src=filename;

    // adding it to local storage
    localStorage.setItem("photo", filename);

    // DEBUG STATEMENT
    alert(localStorage);
 }
 // 
    
  }
  function onError( err ){
    alert("table does not exist");
    console.log( err )
  }

  function onFail(errorMessage){
    console.log("Error Message:" + errorMessage);
    alert("Error Message:" + errorMessage);


}