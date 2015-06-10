myMod.controller('BoatPaddlesCtrl', function($scope,ionicLoader,$ionicLoading,$http,$ionicPopup,$ionicScrollDelegate, $state) {
    
  
 
  $scope.allJobsTotal=0;                    //For description see below, comment 1
    
    var tempJobObject = {
      jobsLabel:'',
      jobsNumber:0
     
    };
    
    $scope.jobs=[];
    
    $scope.jobs.push(tempJobObject);
   $scope.allJobsTotal = $scope.allJobsTotal + $scope.jobs[0].jobsNumber;
  
   $scope.addTotalJobs=function(){
     
        $scope.allJobsTotal=0;
          for(var k=0;k<$scope.jobs.length;k++)
    {
   $scope.allJobsTotal=$scope.allJobsTotal+$scope.jobs[k].jobsNumber;
    } 
    
      $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
       
   };
   
   
    $scope.addJobsList=function(){                   //For description see below, comment 2
     
     
      
   $scope.jobs.push({
      jobsLabel:'',
      jobsNumber:0
     
    });
    
    
  
    
    /* ++++++++++++++++ Zubair Comment 11th May, 2015 +++++++++++++++++
    
    
    Below is a line of code wich is used to convert a number value into currency type number. No need of any additional library for that, I found the code with javascript so it is working like a charm.
    Similarly I'll put the code for the jobs Number of each job label.
    
    
    */
    
  
      
    };
    
  
    $scope.deleteJob= function(index){
        
        $scope.myIndex=$scope.jobs.indexOf(index);

        $scope.jobs.splice($scope.myIndex,1);
       
        $scope.allJobsTotal=Number($scope.allJobsTotal.replace(/[^0-9\.]+/g, ''));
        
        $scope.allJobsTotal=($scope.allJobsTotal)-(index.jobsNumber);
       
       $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    
    
    
    //To get the current date All jobs and job number
    
    
     var d = new Date();
   $scope.currentDate= d.getUTCDate() +"/"+ (d.getUTCMonth()+1) +"/"+ d.getUTCFullYear();
   
   ionicLoader.show($ionicLoading);
     $http.post('https://danh-app-devzubair.c9.io/api/getJob',{
        
       date:$scope.currentDate,
       userId:localStorage.getItem("currentUserId")
       
   }).success(function(data) {
       
       if(data!='')
       {
       $scope.jobs=data[0].jobs;
       $scope.allJobsTotal= data[0].jobsTotal;
       $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        ionicLoader.hide($ionicLoading);
       }
       else{
           
           /* +++++++++++++++++++ Zubair Comment 21/May/2015 ++++++++++++++++
           
           Here we are calling the API to get the latest Job as described briefly in Api.js, 
           
           
           
           */
           
            $http.post('https://danh-app-devzubair.c9.io/api/getLatestJob',{
                
                userId : localStorage.getItem("currentUserId")
                
                
            })
        
      
       .success(function(data) {
         
         if(data!='')
         
         {
             
       $scope.jobs=data[0].jobs;
       $scope.allJobsTotal= data[0].jobsTotal;
       $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
       ionicLoader.hide($ionicLoading);
         
         }
         
         else{
             
              ionicLoader.hide($ionicLoading);
         }
         
         
   })
   
        .error(function(error) {
       
       ionicLoader.hide($ionicLoading);
       
   });
           
       }
       
       
   }).error(function(error) {
       
        ionicLoader.hide($ionicLoading);
       
       
   });
    
    
    //need to create this to trigger api to save the Jobs Total to database
  
  $scope.jobsTotal=function(){                   //For description see below, comment 3
    
    
    
    /* +++++++++++++++++ Zubair Comment 20/May/2015 ++++++++++++++++++
    
    This function 'jobsTotal' is having all the logic and APIs calling. Let me
    explain step by step. 
    1) First off all GET API (getJob) is called to check that wether current's
    date data is in database or not.
    2) If data is saved means if(data!='') returns TRUE, meaning that data is
    filled with some data of that date.
    3) UPDATE API is called which is "updateJob" to update the current date
    data with the new one. 
    4) If current date data is not available than POST request API is called
    which will make a new data in our database.
    5) This is how our totalling thing is working.
    
    
    
    
    
    */
    
    if(typeof($scope.allJobsTotal)=="string")
    {
   $scope.allJobsTotal=Number($scope.allJobsTotal.replace(/[^0-9\.]+/g, ''));
    }
  
   
         ionicLoader.show($ionicLoading);
   
   
   $http.post('https://danh-app-devzubair.c9.io/api/getJob',{
       
       date:$scope.currentDate,
       userId: localStorage.getItem("currentUserId")
       
   }).success(function(data) {
       
       if(data!=''){
           
           
           
           $http.post('https://danh-app-devzubair.c9.io/api/updateJob',{
       
   id: data[0]._id,
   newJobsTotal: $scope.allJobsTotal,
   newJobs: $scope.jobs,
   latestUpdate: new Date()
       
   }).success(function(updatedData) {
        var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Jobs Updated!'
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
                 
                 ionicLoader.hide($ionicLoading);
                 localStorage.setItem('allJobsTotal',data.allJobsTotal);
                 
                  if(typeof($scope.allJobsTotal)=="number"){
                 
                 $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
                 
   }).error(function(error) {
        ionicLoader.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: error
                  });
                       alertPopup.then(function(res) {
                      // console.log('Error');
                 });
                 
                   if(typeof($scope.allJobsTotal)=="number"){
                 
                 $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
   });
           
           
       }
       else{
           
            // will post data like so:
    $http.post('https://danh-app-devzubair.c9.io/api/jobsTotal',{
      
     userID:localStorage.getItem('currentUserId'),
     username: localStorage.getItem('currentUser'),
     date: $scope.currentDate,
     allJobs: $scope.jobs,
     allJobsTotal: $scope.allJobsTotal,
     latestUpdate: new Date()
     
     
      
        }).success(function(data){                   //For description see below, comment 4
          
           var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Jobs Recorded!'
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
                 
                 ionicLoader.hide($ionicLoading);
                 localStorage.setItem('allJobsTotal',data.allJobsTotal);
                 
                   if(typeof($scope.allJobsTotal)=="number"){
                 
                 $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
          
        }).error(function(error){
          ionicLoader.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: error
                  });
                       alertPopup.then(function(res) {
                      // console.log('Error');
                 });
                 
                   if(typeof($scope.allJobsTotal)=="number"){
                 
                 $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
        });
       }
       
   }).error(function(error) {
       
       if(error){
           
             if(typeof($scope.allJobsTotal)=="number"){
                 
                 $scope.allJobsTotal='$' + $scope.allJobsTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
           
       }
       
   });
   
      
      
   
        
  };
  
  $scope.goToState=function(page){
      $state.go(page);
  };
});


/* +++++++++++++++++++++++++++ Zubair Comment 18th March, 2015 +++++++++++++++++++++++++++++++++++++


 1) First of all, I ave reused the code you have written. It was totally correct, I just changed the $scope variables a bit becuase we needed the objects
 for our jobs schema so we have made var=tempJobObj which is nothing but a simple object taking three things, label number date.
 We have than pushed the variable into our jobs array because we actually need to send this array to our Api so that it will be saved in MongoLab as it is.
 Please see schema.js where jobs Array is also an object with all the same fields.
 
 2) Secondly, addJobsList function is called in which first of all we are adding the job total number by adding all the jobs number, also a line is added in
 the UI because ng-repeat is working there which we have used before a lot of times.
 
 3) Once we are done with add jobs list, we move further to call the main submit button "Next Step......" in which jobsTotal function is calling.
 Api is than called which we have made in Api.js and sending the appropriate request to the server with data same as schema.
 
 Note: We are sending userID and username as well which are being called from the localStorage because we know that when user login we have provided the
 code of localStorage.setItem('......','......') so now it is helpful here.
 
 4) Once data is requested to the server, the server responds back in the form of 'data' or 'error', we are than using that with simply ionic alert
 which we have seen before in many cases.
 




*/