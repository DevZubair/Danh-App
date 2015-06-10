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


// Boat Paddles Jobs Schema
var paddlesJobsSchema=mongoose.Schema({
  
   userId:String,
   username: String,
   date: String,
   jobs:[],
   jobsTotal:Number,
   latestUpdate: Date
   
});

mongoose.model('Paddles_Boats',paddlesJobsSchema);

// Boat Weight  Schema
var weightJobsSchema=mongoose.Schema({
  
   userId:String,
   username: String,
   date: String,
   weights:[],
   weightsTotal:Number,
   latestUpdate: Date
   
});

mongoose.model('Weight_Boats',weightJobsSchema);


//Unlocked_Pages Schema

var unlockedPagesSchema=mongoose.Schema({
   
      userEmail: String,
      userName: String,
      stepsWelcome: Boolean,
      stepsAbout: Boolean,
      stepsBoat: Boolean,
      stepsTime: Boolean,
      stepsMobilize: Boolean,
      stepsOrigins: Boolean,
      stepsWhy: Boolean,  
      stepsWrong: Boolean,
      stepsOwned: Boolean,
      stepsDelay: Boolean,
      stepsPortfoolio: Boolean,
      stepsHealth: Boolean,
      stepsPlanB: Boolean,  
      stepsActive: Boolean,
      stepsPassive: Boolean,
      stepsRetire: Boolean,
      stepsResiduals: Boolean,
      stepsRepeat: Boolean,
      stepsLeverage: Boolean,  
      stepsTechie: Boolean,
      stepsSupport: Boolean,
      stepsSeeds: Boolean,
      stepsMiniMe: Boolean,
      stepsSystem: Boolean,
      steps1Hour: Boolean,  
      boatIntro: Boolean,
      boatPaddles: Boolean,
      boatEngines: Boolean,
      boatEngineWt: Boolean,
      boatFuel: Boolean,
      boatCharts: Boolean,
      compassIntro: Boolean,
      compassPaddling: Boolean,
      compassFloat: Boolean,
      compassEngine: Boolean,
      compassCruise: Boolean,
      compassNoFool: Boolean,
      compassFreedom: Boolean,
      compassWealth: Boolean,
      compassDreams: Boolean,
      engines: Boolean,
      lake: Boolean,
      ocean: Boolean
   
});

/*  ++++++++++++++++++++++++++++ Zubair Comment 3rd April, 2015 ++++++++++++++++++++++++++++++++++++

Well above I have changed the name of the variables you have taken, I have removed all the - from the variables name because it is invalid to make a variable name with a - especially when you are making any object fields. 
Also boolen value was wrong, it is with capital B not small b. 


*/


mongoose.model('Unlocked_Pages',unlockedPagesSchema);




/* ++++++++++++++++++ Zubair Comment 5th March, 2015 ++++++++++++++++++++++++++++++

  Schema.js file is basically used to add the collections format for my MongoDB. I can add collections as much as I
  need for my app. 
  
  Note:
  mongoose.model will be used in my APIs to set the values in each object in this schema and than server will 
  send all the data with schema to the Mongo Lab collections and it will be added there.


*/
