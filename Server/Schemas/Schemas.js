// We need to reset server for any changes is Schema.js to take effect

var mongoose=require('mongoose');

//Member Schema
var memberSchema=mongoose.Schema({
   
    Firstname:String,
    Lastname:String,
    Username:String,
    Password:String,
    Email:String,
    Aboutme:String,
    Mentor:String,
    ProfilePicture: [{'src':String,'current':Boolean}]
   
   
});


mongoose.model('Members',memberSchema);


// Jobs Schema
var jobsSchema=mongoose.Schema({
  
   userId:String,
   username: String,
   jobs:[Object],
   
   jobsTotal:Number
});

mongoose.model('Jobs',jobsSchema);

//Locked_Pages Schema

var lockedPagesSchema=mongoose.Schema({
   
      stepsWelcomeUnlocked: Boolean,
      stepsAboutUnlocked: Boolean,
      stepsBoatUnlocked: Boolean,
      stepsTimeUnlocked: Boolean,
      stepsMobilizeUnlocked: Boolean,
      stepsOriginsUnlocked: Boolean,
      stepsWhyUnlocked: Boolean,  
      stepsWrongUnlocked: Boolean,
      stepsOwnedUnlocked: Boolean,
      stepsDelayUnlocked: Boolean,
      stepsPortfoolioUnlocked: Boolean,
      stepsHealthUnlocked: Boolean,
      stepsPlanbUnlocked: Boolean,  
      stepsActiveUnlocked: Boolean,
      stepsPassiveUnlocked: Boolean,
      stepsRetireUnlocked: Boolean,
      stepsResidualsUnlocked: Boolean,
      stepsRepeatUnlocked: Boolean,
      stepsLeverageUnlocked: Boolean,  
      stepsTechieUnlocked: Boolean,
      stepsSupportUnlocked: Boolean,
      stepsSeedsUnlocked: Boolean,
      stepsMiniMeUnlocked: Boolean,
      stepsSystemUnlocked: Boolean,
      steps1HourUnlocked: Boolean,  
   
   
});

/*  ++++++++++++++++++++++++++++ Zubair Comment 3rd April, 2015 ++++++++++++++++++++++++++++++++++++

Well above I have changed the name of the variables you have taken, I have removed all the - from the variables name because it is invalid to make a variable name with a - especially when you are making any object fields. 
Also boolen value was wrong, it is with capital B not small b. 


*/


mongoose.model('Locked_Pages',lockedPagesSchema);




/* ++++++++++++++++++ Zubair Comment 5th March, 2015 ++++++++++++++++++++++++++++++

  Schema.js file is basically used to add the collections format for my MongoDB. I can add collections as much as I
  need for my app. 
  
  Note:
  mongoose.model will be used in my APIs to set the values in each object in this schema and than server will 
  send all the data with schema to the Mongo Lab collections and it will be added there.


*/
