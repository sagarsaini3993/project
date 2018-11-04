document.addEventListener("deviceready", getPhoto );
document.getElementById("takePhotoButton").addEventListener("click",takePhoto);
document.getElementById("pickPhotoButton").addEventListener("click",picPhotoFromGallery);

function getPhoto(){
   var filename= localStorage.getItem("photo");
   var imagebox = document.getElementById("photoContainer");
imagebox.src= filename;
alert(filename);

}
function takePhoto(){
    console.log("take photo pressed");
    alert("take photo pressed");
     var cameraOptions = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE
    };

   navigator.camera.getPicture(onSuccess, onFail, cameraOptions);


}

function onSuccess(filename) {
    if (window.cordova.platformId == "android") {
      window.FilePath.resolveNativePath(imageURI, function(result) {
        imageURI = filename;
        alert("Success: " + filename);
        localStorage.setItem("photo", filename);
        
        var image = document.getElementById("photoPlaceholder");
        image.src = filename;

      }, function (error) {
        alert("error when converting file path!");
      });
    }
    else {
      // show image in UI
     var image = document.getElementById("photoPlaceholder");
     image.src = filename;

     // adding it to local storage
     localStorage.setItem("photo", filename);

    // DEBUG STATEMENT
     alert(localStorage);
  }
}
function onFail(errorMessage){
    console.log("Error Message:" + errorMessage);
    alert("Error Message:" + errorMessage);


}
function picPhotoFromGallery(){
     console.log("pic photo pressed");
     alert("pic photo pressed");
      var cameraOptions = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY
    };

   navigator.camera.getPicture(onSuccess, onFail, cameraOptions);

    
}