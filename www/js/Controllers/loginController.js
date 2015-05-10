
myMod.controller('LoginCtrl', function($scope, $http,$state,$rootScope,$ionicLoading,$ionicPopup,ionicLoader) {
 
 
 localStorage.clear();        /*Used this line to clear the localStorage all data from browser
                                so that user will login with it's own id and password again  */
 
 
 

 
 
 /* ++++++++++++++++++++++ Zubair Comment 10th March, 2015 +++++++++++++++++++++++++++++++
 
 
 Coding above is the given sample of code on ionic docs, I have just copied it here. $ionicLoading is a 
 directive and I have called show and hide functions on our need. When function starts on any button click, I
 have called show() and when function returns something, I have called hide().
 
 Note:
 
 Template I have used for ionic loading is default, I have downloaded a pretty nice loader from google and add the
 css in loader.css file in css folder. Than I have called it in a div using template of ionic loading
 
 
 */
 
$scope.loginData={
    
  username:'',
  password:''
    
    
    
};

$scope.doLogin=function(){
  
  ionicLoader.show($ionicLoading);
  
  /* +++++++++++++++++++++++++++++++++ Zubair Comment 11th March, 2015 +++++++++++++++++++++++++++++++++++
  
  Please see above that we have called our factory function show() passing our $ionicLoading parameter. So now we don't had to define any function above,
  it is already defined in factory once so we are now using it. Same will repeat with hide() as well below.
  And please don't forget to see the first line of controller where I have passed ionicLoader as a parameter which is called as injection of a factory.
  
  */
  
    
  $http.post('https://danh-app-devzubair.c9.io/api/loginMember',{
      
      userName:$scope.loginData.username
      
  }).success(function(data){
      
      if(data=="")
      {
        ionicLoader.hide($ionicLoading);
          //alert('This Username is not available.  Please choose another one.');
          
         
              var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: 'The username is not available, please choose another.'
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });

          
          
          
      }
      else{
          if(data.Password==$scope.loginData.password)
          {
            
              localStorage.setItem('currentUser',$scope.loginData.username);       //$rootScope is more like a global variable
              localStorage.setItem('currentUserId',data._id);  
              localStorage.setItem('currentUserFirstName',data.Firstname);
              localStorage.setItem('currentUserMentorName',data.Mentor);
              
              
              console.log('login Success!');
              ionicLoader.hide($ionicLoading);
              //alert("Welcome Back! Let's Go!");
              
               var alertPopup = $ionicPopup.alert({
              title: 'Welcome Back'  + '  ' + localStorage.getItem('currentUserFirstName') + ' !',
              template: "Let's Go!"
               })
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
              
              
              
              /* +++++++++++++++++++++++++++++ Zubair Comment 9th March, 2015 ++++++++++++++++++++++
              
              
              You forgot to put the inverted comma in the end in alert string, that's why error was coming
              
              
              */
              
              $state.go('members.mission');
          }
          else{
            ionicLoader.hide($ionicLoading);
            //  alert('This Password is not valid.');
            
            
              var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: "This Password is not valid."
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
            
            
          }
      }
      
      
  }).error(function(data){
    
    ionicLoader.hide($ionicLoading);
      
    //  alert('Username is not valid!');
      
        var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: "Username is not valid!"
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
            
      
      
  });
    
    
    
};
  
  
  /* +++++++++++++++++++++++++ Zubair Comments 10th March, 2015 +++++++++++++++++++++++++++++++
  
  All the javascript alerts are now replaced with ionic own alert popups. Please make sure that before calling
  any directive of ionic, we have to inject it in the controller first. Please see parameter bracket of controller.
  
  
  */
  
  
  
  
  
  
  
});

