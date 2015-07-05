/*  Author: Muhammad Zubair,  Date: 15/June/2015 */


myMod.controller('InboxRoomCtrl', function($scope, Chats, $http) {
 

$scope.appMembers=[];


   $http.get('https://danh-app-devzubair.c9.io/api/getInbox')
   
   .success(function(data){
       
       $scope.appMembers=data;
      
       
   }).error(function(error){
       
       console.log('Error fetching Inbox Room');
       
   });
 
 
 
});