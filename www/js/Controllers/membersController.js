myMod.controller('MembersCtrl', function($scope, $http,$state,$rootScope,$ionicSideMenuDelegate) {
    
   $scope.toggleRight = function() {
        $ionicSideMenuDelegate.toggleRight();
      };
    
    
    /* ++++++++++++++++++++++ Zubair Comment 9th March, 2015 ++++++++++++++++++++++++++++
    
    
    We have used $ionicSideMenuDelegate for side menu to be opened, it is a pre defined directive made by ionic.
    toggleRight function is called when we click on the More button in the tabs.
    
    
    
    */
    
});