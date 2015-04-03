myMod.controller('StepsCtrl', function($scope,$http,ionicLoader,$ionicLoading) {
    
    $scope.stepsList= [
    "Welcome!", 
    "About",
    "Boat",
    "Time",
    "DeCubicled", 
    "Origins",
    "Why",
    "Wrong", 
    "Owned",
    "Delayed",
    "PortFoolio", 
    "Health",
    "Plan B",
    "Active", 
    "Passive",
    "Retire",
    "Residuals", 
    "Repeat",
    "Leverage",
    "Techie", 
    "Support",
    "Seeds",
    "Mini-Me",
    "System",
    "1-Hour"
   
    ];
    
    $scope.showDisclaimer=true;
    $scope.changeTest = function(){
      $scope.showDisclaimer=false
    }
    
    $scope.userName=localStorage.getItem("currentUser");
    $scope.firstName=localStorage.getItem("currentUserFirstName");
    $scope.mentorName=localStorage.getItem("currentUserMentorName");
 



/* ++++++++++++++++++++++++++++ Zubair Comment 11th March, 2015  +++++++++++++++++++++++++++++++++++++++


    Below is the code for getting the current member (logged in) data by using LocalStorage help because we know that when a member is logged in
    successfully than there we have saved his/her unique MongoLab id into localStorage, so now with the help of that id we will call the server to bring
    the member data of this id.


*/

ionicLoader.show($ionicLoading);


$http.post('https://danhproject-devzubair-4.c9.io/api/profileMember',{
      
      id: localStorage.getItem('currentUserId')
   
  }).success(function(data){
      
     console.log(data);   
     
 //Please see browser console, data will response with all the data of user, you can popout firstname and mentorName from it by calling data.firstName e.g
    
      ionicLoader.hide($ionicLoading);

  }).error(function(data){

      console.log('Data Not found!');
      ionicLoader.hide($ionicLoading);
  });



});