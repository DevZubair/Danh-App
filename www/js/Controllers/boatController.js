myMod.controller('BoatCtrl', function($scope,ionicLoader,$ionicLoading,$http,$ionicPopup,$ionicScrollDelegate, $state) {
    
    //to bring function to load at top of each boat calculator on Next button, not working
    //$scope.scrollTop();
    
    //bring in data from local storage to personalize the content
    $scope.firstName=localStorage.getItem("currentUserFirstName");
    $scope.mentorName=localStorage.getItem("currentUserMentorName");
    
  // first we assign default values to each data field 
  
 

  $scope.goToState=function(page){
      $state.go(page);
  };
});

