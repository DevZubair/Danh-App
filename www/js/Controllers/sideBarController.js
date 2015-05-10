myMod.controller('sideBarController', function($scope,$http,ionicLoader,$ionicLoading,$state,$ionicScrollDelegate) {
    
   
   $scope.resetLockPages=function(){
       
      $http.post('https://danh-app-devzubair.c9.io/api/resetMemberUnlockedPages',{
      
      userName: localStorage.getItem('currentUser')
   
  }).success(function(data){
      
     console.log(data);   
     ionicLoader.hide($ionicLoading);
     
     $state.go('members.mission');




  }).error(function(data){

      console.log('Data Not found!');
      ionicLoader.hide($ionicLoading);
  });
       
   };
   
   
   $scope.logout=function(){
       
       localStorage.clear();
       $state.go('front');
       
       
   };
    
    
    
});