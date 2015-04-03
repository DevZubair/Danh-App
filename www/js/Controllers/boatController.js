myMod.controller('BoatCtrl', function($scope,ionicLoader,$ionicLoading,$http,$ionicPopup) {
    
    
  // first we assign default values to each data field 
  
 var date=new Date();

 
  $scope.allJobsTotal=0;                    //For description see below, comment 1
    
    var tempJobObject = {
      jobsLabel:'',
      jobsNumber:0,
      jobDate:date
    };
    
    $scope.jobs=[];
    
    $scope.jobs.push(tempJobObject);
   $scope.allJobsTotal = $scope.allJobsTotal + $scope.jobs[0].jobsNumber;
  
   
    $scope.addJobsList=function(){                   //For description see below, comment 2
     
      $scope.allJobsTotal=0;
      
   $scope.jobs.push({
      jobsLabel:'',
      jobsNumber:0,
      jobDate:date
    });
    for(var k=0;k<$scope.jobs.length;k++)
    {
   $scope.allJobsTotal=$scope.allJobsTotal+$scope.jobs[k].jobsNumber;
    } 
      
    };
    
  //need to create this to trigger api to save the Jobs Total to database
  
  $scope.jobsTotal=function(){                   //For description see below, comment 3
    
   
    console.log($scope.jobs);

    
      
      ionicLoader.show($ionicLoading);
      
      
    // will post data like so:
        $http.post('https://ionic-test2-danh1975.c9.io/api/jobsTotal',{
      
     userID:localStorage.getItem('currentUserId'),
     username: localStorage.getItem('currentUser'),
     allJobs: $scope.jobs,
     allJobsTotal: $scope.allJobsTotal
     
     
      
        }).success(function(data){                   //For description see below, comment 4
          
           var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: data
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
                 
                 ionicLoader.hide($ionicLoading);
          
        }).error(function(error){
          ionicLoader.hide($ionicLoading);
          var alertPopup = $ionicPopup.alert({
              title: 'Alert!',
              template: error
                  });
                       alertPopup.then(function(res) {
                      // console.log('Error');
                 });
        });
        
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