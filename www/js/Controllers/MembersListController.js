/* Author: Muhammad Zubair, 14/June/2015 */


myMod.controller('MembersListCtrl', function($scope,ionicLoader,$ionicLoading,$http,$ionicPopup,$ionicScrollDelegate, $state) {
    
    
    
    $scope.chatMembers=[];
           
    
    
    
    ionicLoader.show($ionicLoading);
    $http.get('https://danh-app-devzubair.c9.io/api/getAllMembers')
    
    
    
     .success(function(data){
        
        $scope.appMembers=data;
        ionicLoader.hide($ionicLoading);
        
        
    }).error(function(error){
        
        console.log('error in fetching members');
        ionicLoader.hide($ionicLoading);
        
    });
    
    
    $scope.createRoom=function(friend){
    
      localStorage.setItem('chatFriend',friend.Username);
      
    
    $scope.chatMembers.push({
           userName: localStorage.getItem('currentUser'),
           status: '',
           readMessages: 0
          },
          {
           userName: localStorage.getItem('chatFriend'),
           status: '',
           readMessages: 0
          });
    
    $scope.currentUser=localStorage.getItem('currentUser');
    $scope.otherUser=localStorage.getItem('chatFriend');
    
    var friend1= $scope.currentUser.slice(0, 1);
    var friend2= $scope.otherUser.slice(0, 1);
    
    if(friend1<friend2)
    {
        
    $scope.RoomID=$scope.currentUser+$scope.otherUser; 
    
    }
    else{
        
         $scope.RoomID=$scope.otherUser+$scope.currentUser; 
    }
    
    $http.post('https://danh-app-devzubair.c9.io/api/roomCreate',{
        
        RoomID: $scope.RoomID,
        RoomIcon: "asdasdasdasd",
        RoomName: localStorage.getItem('currentUser') + '+' + localStorage.getItem('chatFriend'),
        Users: $scope.chatMembers
        
        
    }).success(function(data){
        
        console.log(data);
        if(data.name=="ValidationError"){
            
          //Room Already Created
             localStorage.setItem('RoomID',$scope.RoomID);
             $state.go('members.chatRoom');
        
        }
        else{
            
            //Room will be created
             localStorage.setItem('RoomID',$scope.RoomID);
             $state.go('members.chatRoom');
        }
        
        
        
    }).error(function(error){
        
        console.log(error);
        
        
        
    });
    
        
    
       
        
        
    };
    
    
    
 
});
