myMod.controller('ProfileCtrl', function($scope, $http,$state,$rootScope,$ionicPopup,$ionicLoading,ionicLoader,$cordovaCamera,$ionicModal,$ionicSlideBoxDelegate) {
   
 
 
  $scope.userNewPassword='';
  $scope.userNewName='';
  $scope.userOldPassword='';
 
  
      $scope.aImages = [{
      
    	}];
      
      //We need src for image source and current for the status that wether this image is current profile pic or not.
      
      
      $scope.image = document.getElementById('myImage');
    
  
  ionicLoader.show($ionicLoading);
  
  
  //For profile picture
  document.addEventListener("deviceready", function () {
  
  
  var options = {
          quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 150,
          targetHeight: 150,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
          cameraDirection:1
        };
        
        
        $scope.addImage = function() {
            
           $cordovaCamera.getPicture(options).then(function(imageData) {
          $scope.image = document.getElementById('myImage');
          $scope.image.src = "data:image/jpeg;base64," + imageData;
         // alert($scope.image.src);
          
          $scope.aImages.push({'src':$scope.image.src, 'current':true});
          
          
        }, function(err) {
          alert('Error:' + err);
        });
          
            
        };
        
  },false);
        
        
     /*  +++++++++++++++++++++++++++ Zubair Comment 20th March, 2015 ++++++++++++++++++++++++++++
     
     Well the above code we have written is basically cordova camera plugin own code. There are multiple options available for it like saving
     the taken picture to own gallery or not etc etc. I have put all the code in "deviceReady" function because this code will prompt an 
     error on browser as browser don't know anything about the plugins. deviceReady means that when this app is deployed on any real device
     (not browser, not emulator) than this code will run.
     
     Later we will send the URL of the image to mongoDB so that we can bring the data on profile of current user along with profile picture.
     
     There are some quick tips regarding the cordova camera plugin, there are two methods to save our image in our database. One is making it a 
     file (usually called FILE URL) and another is Base 64 image url. I have used Base 64 always so I have used the same here as well because for 
     file we have to install another plugin and code will be more big. I am still not very much clear of the difference that why people use
     FILE instead of Base 64 or why to use Base 64 instead of FILE Url.
     
     
     
     
     
     */
        
  
  
  
  
   $http.post('https://danh-app-devzubair.c9.io/api/profileMember',{
      
      id: localStorage.getItem('currentUserId')
   
  }).success(function(data){
      
      $scope.currentUserData=data;
      $scope.userNewName=$scope.currentUserData.Username;   
      //Used this line to show textfield already filled with username
      
      
      /* +++++++++++++++++++++++++++ Zubair Comment 24th March, 2015 ++++++++++++++++++++++++++++++++++
      
      we were already calling the $http.post method to bring all the data of the user, so data.ProfilePicture will have all the images which were 
      stored in MongoLab by the user by taking selfies. 
      $scope.image.src is the variable which is used in ng-src in the profile template where we are showing the current profile picture of the user.
      
      
      
      
      */
      
      
      for(var i=0; i<data.ProfilePicture.length;i++){
          if(data.ProfilePicture[i].current==true)
          {
     $scope.image.src=data.ProfilePicture[i].src;
          }
             $scope.aImages.push({'src':data.ProfilePicture[i].src, 'current':data.ProfilePicture[i].current});
      }
      
       $scope.aImages.splice(0,1);
      
      ionicLoader.hide($ionicLoading);

  }).error(function(data){

      console.log('Data Not found!');
      ionicLoader.hide($ionicLoading);
  });
   
   
      
      
      
      $scope.updateUserInfo=function(){
          
           ionicLoader.show($ionicLoading);
        
        /*  ++++++++++++++++++++++ Zubair Comment 7th March, 2015 +++++++++++++++++++++++++++
        
        
        First we need to check wether new username is available or not so a get request will be called simply
        just to check wether username is available in database or not, if it is, than error should be prompted that
        username already taken.....
        
        */
        
        if($scope.userNewName==$scope.currentUserData.Username)
        {
            
            
            /* +++++++++++++++++++++ Zubair Comment 7th March, 2015 ++++++++++++++++++++++
            
            Secondly, we have to check that wether old password entered is correct or not, all this is done 
            because of security issue. 
            
            
            */
            
            
            if($scope.currentUserData.Password==$scope.userOldPassword)
            {
                
                
                /* +++++++++++++++++++ Zubair Comment 7th March, 2015 +++++++++++++++++++++ 
                
        Than, if all the authentication is correct, we have called post request to update the data and we have
        called Api here which we have made in Api.js
                
                
                */
                
                /* 
                Before calling the update Api, one thing we need to make sure that either user has typed something 
                into the new password textbox or left it empty as he/she do not want to make a change with their
                password. 
                For this, I have used simple if else condition checking that if 'if' condition gets true meaning
                that their is some data in $scope.userNewPassword than keep it as it is or else make it equal
                to the old password which was saved in dataabase.
                
                
                */
                
                if($scope.userNewPassword){
                    $scope.userNewPassword=$scope.userNewPassword;
                }
                else{
                    $scope.userNewPassword=$scope.currentUserData.Password;
                }
                
                 $http.post('https://danh-app-devzubair.c9.io/api/editProfile',{
             
             id:$scope.currentUserData._id,
             Firstname:$scope.currentUserData.Firstname,
             Lastname:$scope.currentUserData.Lastname,
             Username:$scope.userNewName,
             Gender: $scope.currentUserData.Gender,
             Password:$scope.userNewPassword,
             Email:$scope.currentUserData.Email,
             Aboutme:$scope.currentUserData.Aboutme,
             ProfilePicture:$scope.aImages
             
         }).success(function(data){
             localStorage.setItem('currentUser',$scope.currentUserData._id);
             ionicLoader.hide($ionicLoading);
            
             var alertPopup = $ionicPopup.alert({
              title: '',
              template: "Data Updated!"
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
            
            
             
         }).error(function(data){
             
             console.log('Data not updated' + data);
              ionicLoader.hide($ionicLoading);
             
             
         });
                
            }
            else{
                
               ionicLoader.hide($ionicLoading);
              
              var alertPopup = $ionicPopup.alert({
              title: 'Danh App Alert!',
              template: "To update, you must also enter your old Password!"
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
                
            }
            
            /* Above else is used in case that user do not want to change the password. So atleast he/she must
            type the old password to edit profile info. Again it's a security reason to make our app more
            reliable for users
            
            */
            
        }
        else{
            
        /*  ++++++++++++++++++++ Zubair Comment 7th March, 2015 ++++++++++++++++++++++++++
        
        Logic : 
        
        I have put an if and else condition here which might you find a bit confusing. Let me explain. 
        Basically there are two conditions when User wants to update his/her profile.
        
        1) Keep the username same and update other fields.
        2) Change the username as well as other fields.
        
        Explanation:
        
        1) For the first condition, I have used "if" statement in which I am checking that if username is same
        as the database one, than it means that user  is keeping his/her username same so after it I just
        normally provided a check for password and update Api is called with no worries.
        
        2) For the second condition, "else" statement is working in which I have put a little logic behind it.
        I called another Api first which was getting a particular member by sending it's username to the 
        database which we have seen previously in login controller. 
        Reason for this is that we need to check that either the new username is already presented in the
        database or not (just like we have checked in the registration form). 
        
        Quick Notes:
        
        -> if(data) means that username is present and data is being responsed from the server so we provided
            an alert prompting error for user not available.
            
        -> else if(password query.........) means that username is not presented in the database so a user can
            use his/her new username but than a simple password check is again provided to see the authentication.
        
        -> After all this, update Api is called (/api/editProfile) in which data will be updated and user will get
            a prompt that data is successfully updated.
        
        
        
        */
        
         if($scope.userNewPassword){
                    $scope.userNewPassword=$scope.userNewPassword;
                }
                else{
                    $scope.userNewPassword=$scope.currentUserData.Password;
                }
        
        
        
         $http.post('https://danh-app-devzubair.c9.io/api/getMember',{
             
             userName:$scope.userNewName
             
         }).success(function(data) {
             
             if(data)
             {
                 //alert('Username is not available, please select another name');
                  ionicLoader.hide($ionicLoading);
                   var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: "Username is not available, please select another name!"
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
                 
                 
             }
             else if($scope.currentUserData.Password==$scope.userOldPassword){
                 
                 
                 
                 
                  $http.post('https://danh-app-devzubair.c9.io/api/editProfile',{
             
             id:$scope.currentUserData._id,
             Firstname:$scope.currentUserData.Firstname,
             Lastname:$scope.currentUserData.Lastname,
             Username:$scope.userNewName,
             Gender: $scope.currentUserData.Gender,
             Password:$scope.userNewPassword,
             Email:$scope.currentUserData.Email,
             Aboutme:$scope.currentUserData.Aboutme,
             ProfilePicture:$scope.aImages                     //aImages is the array containing image source and current status.
             
         }).success(function(data){
             
            ionicLoader.hide($ionicLoading);
            
            
                   var alertPopup = $ionicPopup.alert({
              title: 'Danh App Alert!',
              template: "Data Updated!"
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
            
             
         }).error(function(data){
             
             console.log('Data not updated' + data);
              ionicLoader.hide($ionicLoading);
             
         });
                 
                 
                 
             }
             else{
                
             //   alert('For data update, you must type old Password');
              ionicLoader.hide($ionicLoading);
               var alertPopup = $ionicPopup.alert({
              title: 'Danh App Alert!',
              template: "For data update, you must type old Password!"
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
             
                
            }
             
         }).error(function(error) {
             
              ionicLoader.hide($ionicLoading);
             console.log('error' + error);
             
         });
        
        
        
        }
        
        
        
        
    };
    
    
    /* ++++++++++++++++++++++++ Zubair Comment 24th March, 2015 +++++++++++++++++++++++++++++
    
    $ionicModal is the built-in Ionic modal which I have used here and called the template which we have made in the profile.html page in the script tag.
    setProfilePic is the function which will be called once the user select any image to make it his/her current profile picture.
    
    
    */
    
    
    
    $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.browseImages=function(){
        
        
        $scope.modal.show();
        
        
    };
    
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
  $scope.setProfilePic=function(index){
     // console.log($scope.aImages[index]);
      $scope.image.src=$scope.aImages[index].src;
      $scope.closeModal();
      
  };
    


    
    
});

/* +++++++++++++++++ Zubair Comment 7th March, 2015 ++++++++++++++++++++++++

  Quick Overview:
  
  1) We setup the required $scope variables for all fields
  2) Get the data from database 
  3) Linked the $scope variable with data from database to show the textboxes already filled with old values
  4) Password is not showing because security reasons to make our app reliable
  5) Called the editProfile Function on submit button click
  6) First checked that either username is changed or not.
     -> If changed, checked for the availability
     -> If unchanged, directly updated the data
  7) Secondly checked for the old Password which should be correct to update the info
  8) If authentication is correct, data will be updated.
  9) _id is the unique id generated by MongoDB itself for each data in a collection
  



*/