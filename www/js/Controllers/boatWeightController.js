myMod.controller('BoatWeightCtrl', function($scope,ionicLoader,$ionicLoading,$http,$ionicPopup,$ionicScrollDelegate, $state) {
    
   $scope.expensesList=[
       {
      expensesLabel:'Rent/Mortgage',
      expensesNumber:0
     
    },{
      expensesLabel:'Electricity',
      expensesNumber:0
     
    },{
      expensesLabel:'Gas/Heating',
      expensesNumber:0
     
    },{
      expensesLabel:'Water',
      expensesNumber:0
     
    },{
      expensesLabel:'Car/Transportation',
      expensesNumber:0
     
    },{
      expensesLabel:'Gasoline',
      expensesNumber:0

    },{
      expensesLabel:'Clothing',
      expensesNumber:0
     
    },{
      expensesLabel:'Phone/Internet',
      expensesNumber:0
     
    },{
      expensesLabel:'Food - Groceries',
      expensesNumber:0
     
    },{
      expensesLabel:'Food - Eating Out',
      expensesNumber:0
     
    },{
      expensesLabel:'Credit Card Payments',
      expensesNumber:0
     
    },{
      expensesLabel:'Entertainment',
      expensesNumber:0
     
    },{
      expensesLabel:'Insurance - Auto',
      expensesNumber:0
     
    },{
      expensesLabel:'Insurance - Health',
      expensesNumber:0
     
    },{
      expensesLabel:'Insurance - Life',
      expensesNumber:0
     
    },{
      expensesLabel:'Other #1',
      expensesNumber:0
     
    },{
      expensesLabel:'Other #2',
      expensesNumber:0
     
    },{
      expensesLabel:'Other #3',
      expensesNumber:0
     
    },
    
   
    
       ];
       
   $scope.expensesTotal=0;
  
   // Formatting the Expenses Numbers?
 
   $scope.allExpensesTotal=function(){
     
        $scope.expensesTotal=0;
          for(var k=0;k<$scope.expensesList.length;k++)
    {
   $scope.expensesTotal=$scope.expensesTotal+$scope.expensesList[k].expensesNumber;
    } 
    
      $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
       
   };
   
   
   // Adding another Expense to the list? Danh
   
    $scope.addExpenseList=function(){                   //For description see below, comment 2
     
     
      
   $scope.expensesList.push({
      expensesLabel:'',
      expensesNumber:0
     
    });
    
    
  
    
    /* ++++++++++++++++ Zubair Comment 11th May, 2015 +++++++++++++++++
    
    
    Below is a line of code wich is used to convert a number value into currency type number. No need of any additional library for that, I found the code with javascript so it is working like a charm.
    Similarly I'll put the code for the jobs Number of each job label.
    
    
    */
    
  
      
    };
    
  
    $scope.deleteJob= function(index){
        
        $scope.myIndex=$scope.expensesList.indexOf(index);

        $scope.expensesList.splice($scope.myIndex,1);
       
        $scope.expensesTotal=Number($scope.expensesTotal.replace(/[^0-9\.]+/g, ''));
        
        $scope.expensesTotal=($scope.expensesTotal)-(index.expensesNumber);
       
       $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    
    
    
    //To get the current date All Expense and Expense number
    // do we have to rename the api to "getExpenses" ? danh
    // I did not rename anything below here, as it has to do with the api and I don't want to mess that up too much, but you get the idea.  We want to remove all mentions of "job" and use the word "expense" instead
    
    
     var d = new Date();
   $scope.currentDate= d.getUTCDate() +"/"+ (d.getUTCMonth()+1) +"/"+ d.getUTCFullYear();
   
   ionicLoader.show($ionicLoading);
     $http.post('https://danh-app-devzubair.c9.io/api/getWeights',{
        
       date:$scope.currentDate,
       userId:localStorage.getItem("currentUserId")
       
   }).success(function(data) {
       
       if(data!='')
       {
       $scope.expensesList=data[0].weights;
       $scope.expensesTotal= data[0].weightsTotal;
       $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        ionicLoader.hide($ionicLoading);
       }
       else{
           
           /* +++++++++++++++++++ Zubair Comment 21/May/2015 ++++++++++++++++
           
           Here we are calling the API to get the latest Job as described briefly in Api.js, 
           
           
           
           */
           
            $http.post('https://danh-app-devzubair.c9.io/api/getLatestWeight',{
                
                userId : localStorage.getItem("currentUserId")
                
                
            })
        
      
       .success(function(data) {
         
         if(data!='')
         
         {
             
       $scope.expensesList=data[0].weights;
       $scope.expensesTotal= data[0].weightsTotal;
       $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
    
    
    //need to create this to trigger api to save the Weights Total to database
  
  $scope.weightsTotal=function(){                   //For description see below, comment 3
    
    
    
   
    if(typeof($scope.expensesTotal)=="string")
    {
   $scope.expensesTotal=Number($scope.expensesTotal.replace(/[^0-9\.]+/g, ''));
    }
  
   
         ionicLoader.show($ionicLoading);
   
   
   $http.post('https://danh-app-devzubair.c9.io/api/getWeights',{
       
       date:$scope.currentDate,
       userId: localStorage.getItem("currentUserId")
       
   }).success(function(data) {
       
       if(data!=''){
           
           
           
           $http.post('https://danh-app-devzubair.c9.io/api/updateWeights',{
       
   id: data[0]._id,
   newWeightsTotal: $scope.expensesTotal,
   newWeights: $scope.expensesList,
   latestUpdate: new Date()
       
   }).success(function(updatedData) {
        var alertPopup = $ionicPopup.alert({
              title: 'Success!',
              template: 'Weights Updated!'
                  });
                       alertPopup.then(function(res) {
                      // console.log('Thank you');
                 });
                 
                 ionicLoader.hide($ionicLoading);
                 localStorage.setItem('allWeightsTotal',data.weightsTotal);
                 
                  if(typeof($scope.expensesTotal)=="number"){
                 
                 $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
                 
                   if(typeof($scope.expensesTotal)=="number"){
                 
                 $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
   });
           
           
       }
       else{
           
            // will post data like so:
    $http.post('https://danh-app-devzubair.c9.io/api/weightsTotal',{
      
     userID:localStorage.getItem('currentUserId'),
     username: localStorage.getItem('currentUser'),
     date: $scope.currentDate,
     allWeights: $scope.expensesList,
     allWeightsTotal: $scope.expensesTotal,
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
                 localStorage.setItem('allJobsTotal',data.allWeightsTotal);
                 
                   if(typeof($scope.expensesTotal)=="number"){
                 
                 $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
                 
                   if(typeof($scope.expensesTotal)=="number"){
                 
                 $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                 }
                 
        });
       }
       
   }).error(function(error) {
       
       if(error){
           
             if(typeof($scope.expensesTotal)=="number"){
                 
                 $scope.expensesTotal='$' + $scope.expensesTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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