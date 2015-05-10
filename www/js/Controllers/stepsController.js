myMod.controller('StepsCtrl', function($scope,$http,ionicLoader,$ionicLoading,$state,$ionicScrollDelegate) {

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

     // add scroll to top function to be used in ng-click
     
   

    $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();

    
  //  $ionicScrollDelegate.scrollTo(100, 0, true);
    

  
    };





    $scope.showDisclaimer=true;
    $scope.changeTest = function(){
      $scope.showDisclaimer=false;
    };

    $scope.userName=localStorage.getItem("currentUser");
    $scope.firstName=localStorage.getItem("currentUserFirstName");
    $scope.mentorName=localStorage.getItem("currentUserMentorName");

 $scope.buttonClass='button-dark icon-left ion-locked';



/* ++++++++++++++++++++++++++++ Zubair Comment 11th March, 2015  +++++++++++++++++++++++++++++++++++++++


    Below is the code for getting the current member (logged in) data by using LocalStorage help because we know that when a member is logged in
    successfully than there we have saved his/her unique MongoLab id into localStorage, so now with the help of that id we will call the server to bring
    the member data of this id.


*/

ionicLoader.show($ionicLoading);


$http.post('https://danh-app-devzubair.c9.io/api/profileMember',{

      id: localStorage.getItem('currentUserId')

  }).success(function(data){

     console.log(data);


 /*  ++++++++++++++++++++++++++++++ Zubair Comment 18th April, 2015 +++++++++++++++++++++++++++++++++++


 Below I have called a API to get the current user's locking page info from the database, note that I have called this API in the success function of
 the already called API (get member info). This actually just makes our App fast and accurate. It's basically the way to call multiple APIs to avoid
 any problem.
 By using this 'data', I have handled the buttons at the top of the steps page. (See stepping-stones.html).

 */

    $http.post('https://danh-app-devzubair.c9.io/api/getMemberUnlockedPages',{

      userName: localStorage.getItem('currentUser')

  }).success(function(data){

     console.log(data);
     $scope.memberLockedPages=data;




      ionicLoader.hide($ionicLoading);

  }).error(function(data){

      console.log('Data Not found!');
      ionicLoader.hide($ionicLoading);
  });



  }).error(function(data){

      console.log('Data Not found!');
      ionicLoader.hide($ionicLoading);
  });

   /*  ++++++++++++++++++++++++++++++ Zubair Comment 18th April, 2015 +++++++++++++++++++++++++++++++++++


This API is used to update the locked and unlocked pages on a button click so its in the function which is called on button click.

Note:

1) id is basically just used to point out the current user's locked page table
2) fieldName is going to be the name of the locked page and it should be same as it is in the mongo collection.
3) 'page' is basically the parameter which is passed when the function is called on next button click. (See the button on step-welcome.html)
4) fieldValue is we know the boolean value which will pass the 'true' value to the API so that it will change the value in Mongo as well.


 */


 var audio1 = document.createElement('audio');
 audio1.src="sounds/unlock.mp3";


 $scope.unlockNextPage=function(page){




  if( $scope.memberLockedPages[page]==true)
  {
       $scope.scrollTop();

      $state.go('members.steps.'+ page);

  }
  else{



      $http.post('https://danh-app-devzubair.c9.io/api/updateUnlockedPages',{

      id: $scope.memberLockedPages._id,
      fieldName:page,
      fieldValue:true,

   // Danh:  what exactly is this doing when unlock is successful, what is the "data" that is logging into the console? OK
   
   // Zubair: Console.log(data) is just a response from server and is printed in the browser's console, nothing much to do with our App.

  }).success(function(data){

     console.log(data);


    //Danh: I see the "fade" animation here, not sure what we are fading, are we still using this fading, on top of the "pulse" css animation? OK, got it, so the fade here is calling the pulse animation defined in the @keyframes
   var buttonStyle=document.getElementById(page);

    $scope.buttonClass='button-balanced icon-left ion-locked';

      $scope.buttonAnimation = 'fade';
      $scope.scrollTop();

        buttonStyle.className  = "fade button button-balanced";
        buttonStyle.disabled=false;



       $state.go('members.steps.'+ page);

    // Danh: I see this Timeout function a few times, what is it for? OK, I get it now
        setTimeout(function(){


           buttonStyle.className  = "fade button button-balanced";
           audio1.play();


                        setTimeout(function(){

                        buttonStyle.className  = "button button-balanced";




               }, 2000);

         }, 1000);



      ionicLoader.hide($ionicLoading);

  }).error(function(data){

      console.log('Data Not found!');
      ionicLoader.hide($ionicLoading);
  });

  }


};


});