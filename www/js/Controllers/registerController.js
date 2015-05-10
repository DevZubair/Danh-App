myMod.controller('RegisterCtrl',function($scope,$http,$ionicLoading,$ionicPopup,$state,ionicLoader){
  
 
  $scope.firstName='';
  $scope.lastName='';
  $scope.userName='';
  $scope.userPassword='';
  $scope.userEmail='';
  $scope.userAboutme='';
  $scope.userMentor='';
  $scope.userPicture=[];
  
    $scope.stepsWelcome= '',
    $scope.stepsAbout= '',
    $scope.stepsBoat= '',
    $scope.stepsTime= '',
    $scope.stepsMobilize= '',
    $scope.stepsOrigins= '',
    $scope.stepsWhy= '',  
    $scope.stepsWrong= '',
    $scope.stepsOwned= '',
    $scope.stepsDelay= '',
    $scope.stepsPortfoolio= '',
    $scope.stepsHealth= '',
    $scope.stepsPlanB= '', 
    $scope.stepsActive= '',
    $scope.stepsPassive= '',
    $scope.stepsRetire= '',
    $scope.stepsResiduals= '',
    $scope.stepsRepeat= '',
    $scope.stepsLeverage= '',  
    $scope.stepsTechie= '',
    $scope.stepsSupport= '',
    $scope.stepsSeeds= '',
    $scope.stepsMiniMe= '',
    $scope.stepsSystem= '',
    $scope.steps1Hour= '', 
    $scope.boatIntro= '',
    $scope.boatPaddles= '',
    $scope.boatEngines= '',
    $scope.boatEngineWt= '',
    $scope.boatFuel= '',
    $scope.boatCharts= '',
    $scope.compassIntro= '',
    $scope.compassPaddling= '',
    $scope.compassFloat= '',
    $scope.compassEngine= '',
    $scope.compassCruise= '',
    $scope.compassNofool= '',
    $scope.compassFreedom= '',
    $scope.compassWealth= '',
    $scope.compassDreams= '',
    $scope.engines= '',
    $scope.lake= '',
    $scope.ocean= '',
  
 
  
  $scope.addMember=function(){
      
      ionicLoader.show($ionicLoading);
    
    /* +++++++++++++ Zubair Comment 5th March, 2015
    
     Below all the coding is basically calling the API which we have made in Api.js in our server file. Now we know
     that, that Api needs some data, so we have to send the data exactly in the same manner and sequence as we 
     have mentioned in our Api.js file.
     
     Note:
     firstname e.g is the Api.js parameter you can say, $scope.firstname is the value which user is going to type
     in the textbox on register.html page. I have binded this $scope.firstname with ng-model into the textbox.
     This $scope.firstname could be any name but for our ease I have used it as the same name as Api.js parameter
     name
    
    
    */
    
    if($scope.userEmail.search('@')==-1){
        
         $scope.emailValid=true;
         
         $scope.usernameEmpty=false;
         $scope.usernameGreater=false;
         $scope.usernameGreaterThanFive=false;
         $scope.passwordEmpty=false;
         $scope.passwordGreater=false;
         $scope.passwordGreaterThanFive=false;
         
        ionicLoader.hide($ionicLoading);
    
    }
    else if($scope.userName.length=='')
    {
         $scope.emailValid=false;
         $scope.usernameGreater=false;
         $scope.usernameGreaterThanFive=false;
         $scope.passwordEmpty=false;
         $scope.passwordGreater=false;
         $scope.passwordGreaterThanFive=false;
         
        $scope.usernameEmpty=true;
        ionicLoader.hide($ionicLoading);
    }
    
    /* +++++++++++++++++++++++++++++ Zubair Comment 14th March, 2015 ++++++++++++++++++++++++++++++++++
    
    
    Here we have used this logic that simply javascript's .length function is used for validation, if any if condition becomes true than that particular
    $scope variable becomes true and this variable is called in ng-show in register.html
    Note:
    I have used validation for greater than 20 characters below but it will not be used because already a maximum and minimum length property of HTML5
    is used in register.html template so user won't be allowed to enter more than 20 characters so this if else statement for length is unnecessary.
    
    
    */
    
    
    
    else if($scope.userName.length > 20){
        $scope.usernameGreater=true;
        
         $scope.usernameEmpty=false;
         $scope.emailValid=false;
         $scope.usernameGreaterThanFive=false;
         $scope.passwordEmpty=false;
         $scope.passwordGreater=false;
         $scope.passwordGreaterThanFive=false;
         
        ionicLoader.hide($ionicLoading);
    }
    else if($scope.userName.length <= 5 && $scope.userName.length > 0){
        $scope.usernameGreaterThanFive=true;
        
         $scope.usernameEmpty=false;
         $scope.emailValid=false;
         $scope.passwordEmpty=false;
         $scope.passwordGreater=false;
         $scope.passwordGreaterThanFive=false;
         $scope.usernameGreater=false;
        
        ionicLoader.hide($ionicLoading);
    }
    else if($scope.userPassword.length==''){
         $scope.passwordEmpty=true;
         
          $scope.usernameGreaterThanFive=false;
        
         $scope.usernameEmpty=false;
         $scope.emailValid=false;
        
         $scope.passwordGreater=false;
         $scope.passwordGreaterThanFive=false;
         $scope.usernameGreater=false;
         
         ionicLoader.hide($ionicLoading);
    }
    else if($scope.userPassword.length > 20){
         $scope.passwordGreater=true;
         
         $scope.usernameGreaterThanFive=false;
         $scope.usernameEmpty=false;
         $scope.emailValid=false;
         $scope.passwordEmpty=false;
         $scope.passwordGreaterThanFive=false;
         $scope.usernameGreater=false;
         
         ionicLoader.hide($ionicLoading);
    }
    else if($scope.userPassword.length <= 5 && $scope.userPassword.length > 0){
         $scope.passwordGreaterThanFive=true;
         
         $scope.passwordGreater=false;
         $scope.usernameGreaterThanFive=false;
         $scope.usernameEmpty=false;
         $scope.emailValid=false;
         $scope.passwordEmpty=false;
         $scope.usernameGreater=false;
         
         ionicLoader.hide($ionicLoading);
    }
    
    else{
        
         $scope.passwordGreaterThanFive=false;
         $scope.passwordGreater=false;
         $scope.usernameGreaterThanFive=false;
         $scope.usernameEmpty=false;
         $scope.emailValid=false;
         $scope.passwordEmpty=false;
         $scope.usernameGreater=false;
    
  
    $http.post('https://danh-app-devzubair.c9.io/api/addMember',{
      
     
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      userName: $scope.userName,
      userPassword: $scope.userPassword,
      userEmail: $scope.userEmail,
      userAboutme: $scope.userAboutme,
      userMentor: $scope.userMentor,
      profilePicture: $scope.userPicture
      

      
    }).success(function(data){
      
      console.log(data);
     
     // alert('Success' + data);    //This will be called if data is successfully sent to Mongo Lab
      
      
       // set defaults for  Unlocked Pages database table
       
       
    $http.post('https://danh-app-devzubair.c9.io/api/setUnlocked_Pages',{
          
      userEmail:$scope.userEmail,
      userName:$scope.userName
  
      
      
    }).success(function(data) {
        
        console.log('Success in setting defaults for Unlocked pages API');
         ionicLoader.hide($ionicLoading);
         
          var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: 'Registration Succesful!  Start Your Journey with the Stepping Stones...'
                  });
                       alertPopup.then(function(res) {
                            $state.go('login');
                
                 });
        
         
    }).error(function(error) {
        
        console.log('Error in setting defaults for Unlocked_Pages API');
        
    });
      
      
      
       
            
      
      
      
    }).error(function(data){
      
       console.log(data);
       ionicLoader.hide($ionicLoading);
       //alert('Error' + data);     //This will be called if Mongo Lab did not get the data correctly
       
       
        var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: 'Error' + data
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
    });
    
    
    }
    
  };
  

    
        
    });