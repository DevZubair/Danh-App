myMod.controller('MembersCtrl', function($scope, $http,$state,$rootScope,$ionicSideMenuDelegate) {
   
   
    
   $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleRight();
      };
    
    //prevent swipe action from opening the side menu, only applied to friends page for some reason - Danh
    $ionicSideMenuDelegate.canDragContent(false);
    
 
    
    /* ++++++++++++++++++++++ Zubair Comment 9th March, 2015 ++++++++++++++++++++++++++++
    
    We have used $ionicSideMenuDelegate for side menu to be opened, it is a pre defined directive made by ionic.
    toggleRight function is called when we click on the More button in the tabs.
    
    */
    
   
    
});