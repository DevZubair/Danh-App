angular.module('appServices', [])


.factory('ionicLoader', function() {
    
  
  /* +++++++++++++++++++++++++++++ Zubair Comment 11th March, 2015 ++++++++++++++++++++++++++++++++++++
  
  We have made a factory here for our data. Always remember that factory returns an object function so below we have created two functions which we
  require almost on every page for ionic loading effect. This will reduce our code. Everytime we had to write the funtion in controller and than we
  need to call it but now functions are defined once in our factory and now we will just call these functions in our controller wherever needed.
  
  Please Note:
  $ionicLoading is passing as a parameter in show function, we have passed this value from our controller and this contains two built-in methods:
  show and hide by ionic. So that's what we have used than $ionicLoading.show() and $ionicLoading.hide(). We have already seen the template thing before
  that it is just for loading effect.
  
  Now please see controllers where we have used factory for ionic loading to see how to use a factory and how it helps us in reducing our code.
  Login Controller is one of the controller where we have used ionicLoading. 
  
  
  
  
  */
   
   
   return {
    
     show : function($ionicLoading) {
        $ionicLoading.show({
            template: '<div class="spinner">' +
                '<div class="dot1"></div>' +
                '<div class="dot2"></div>' +
                '</div>'
        });
    },
     hide : function($ionicLoading){
        $ionicLoading.hide();
    
    }
   };

    
});