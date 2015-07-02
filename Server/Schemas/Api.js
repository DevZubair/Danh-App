var mongoose=require('mongoose');
var Members=mongoose.model('Members');
var Paddles_Boats=mongoose.model('Paddles_Boats');
var Weight_Boats=mongoose.model('Weight_Boats');
var Unlocked_Pages =mongoose.model('Unlocked_Pages'); 
var Chat_Rooms=mongoose.model('Chat_Rooms');
var Chat_Messages=mongoose.model('Chat_Messages');


// Above we have required the model or we can say schema of mongodb which we have added in Schema.js

// Below we have made all the APIs we want to use in our app.


module.exports.addMember=function(req,res){

    var memberData=req.body;            // req.body will get the data send from the user using our registration form.
   

    Members.findOne({Username:memberData.userName},function(err,data){     
        /* findOne means to get a single data using it's unique username, this is done to put a validation that
            no two persons can use a similar username, if anyone enters already in use username than we will
            prompt him/her an error to select a different username.
            */
        

        if(err){
            res.send(err);
        }
        else{
            if(data==null){   
                
//data would be null if there is no username available matching the user selected username, means username is available
               
               
                var member_info=new Members({
                  
                    Firstname:memberData.firstName,
                    Lastname:memberData.lastName,
                    Username:memberData.userName, 
                    Gender:memberData.gender,
                    Password:memberData.userPassword,
                    Email:memberData.userEmail,
                    Aboutme:memberData.userAboutme,
                    Mentor:memberData.userMentor,
                    ProfilePicture:memberData.profilePicture
                    
                    /* +++++++++++++++++++++++++ Zubair Comment 10th March, 2015 ++++++++++++++++++++++ 
                    
                    Above you forgot to add Mentor in the Api, this is the main thing to do if we want to add
                    any data into our collection, data is saved from here. So when you did not write Mentor field
                    so nothing sent to the database
                    
                    */
            
                    
                });
                member_info.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('User Added Successfully');
                });

            }
            else{
                res.send('Username not available, please select another!');
                console.log('Username not available, please select another!');
            }
        }


    });
};


 /* ++++++++++++++++++++++++++ Zubair Comment 5th March, 2015 +++++++++++++++++++++++++++ 

    So far:
    
    1) We have built the API for getting a user registered.
    2) Server structure is ready.
    3) All dependencies have been added.
    4) Schemas are ready.
    5) $http requests are ready to take data to send it to Mongo Lab.
    6) Connection is running well.
    
    Work To Do:
    
    1) Connect the frontend with the backend now.
    2) Registration form should send all the data to server using $http post request.
    
    (Please see: templates/register.html and it's controller)

*/


module.exports.loginMember=function(req,res){
  
   var memberData=req.body;
   
   
    Members.findOne({Username:memberData.userName},function(err,data){     
     
        

        if(err){
            res.send(err);
        }
        else{
            if(data==null){  
                
                res.send(data);             //This will be a null response indicating that username is not in the database
                
            }
            else{
                res.send(data);             //data will contain all the info of a member
            }
            
        }
        
    });
   
    
   /* ++++++++++++++++++++ Zubair Comment 6th March, 2015 ++++++++++++++++++++++++++++
             
    The above part is quite simple, just calling the API of findOne request, there are two methods of 
    getting the data from database:
             1) get request using find() method         (returns whole collection)
             2) post request using findOne() method     (returns specific data)
             
             
  Note:
             
     Here if(data==null) means that username is not found, so this will send me a null value in the
     response to the controller where I have called this Api. There I have put a code to see if it's null
    (meaning no username) so prompt an error that 'username not found'. (Please see loginCtrl in controller.js)
             
             
             */
    
    
};

module.exports.profileMember=function(req,res){
  
   var memberData=req.body;
   
   
    Members.findOne({_id:memberData.id},function(err,data){     
     
        

        if(err){
            res.send(err);
        }
        else{
            if(data==null){  
                
                res.send(data);             //This will be a null response indicating that username is not in the database
                
            }
            else{
                res.send(data);             //data will contain all the info of a member
            }
            
        }
        
    });
   
   
   /* ++++++++++++++++++++++ Zubair Comment 7th March, 2015 +++++++++++++++++++++++++++++
   
   Profile Member is used to get the current member all data by sending it's id from profileController.js
   and retrieving data there.
   
   Question & Answer:
   
   Q) Why didn't I use loginMember Api for this purpose, it is also bringing all the data?
   Ans) Yes, I could have used loginMember Api for bringing a specific member data but there has been a problem
        that I have to send username into the login Api because login is checked with username ofcourse,
        where profile Api needs to have a unique id to get the data from database, reason is that user can 
        change it's username anytime from profile page so how could username be a unique one, it is updating
        on user's choice so Api could have generate error that username not found because before updating
        I am asking a database to give me the username all details which is ofcourse an error. 
        _id is something which is unique and user cannot change it so it is fixed for each data and yet helps
        us in bringing the appropriate data.
   
   
   
   */
    
  
    
};


module.exports.editProfile=function(req,res){
    
    
    /* +++++++++++++++++++++++++++ Zubair Comment 7th March, 2015 ++++++++++++++++++++++++++
    
    below we can see Members.update function is being called. It is nothing but an easy way to update our 
    data on MongoDB using angular http requests. It takes four parameters:
    1) id of the data
    2) fields to be updated and their values
    3) boolean value
    4) boolean value
    
    Parameter 3rd and 4th are not yet cleared for me even though, I'll dig more for them. Yet I use false and true
    values everytime and it worked as suggested on some stackoverflow question. I'll describe it more once
    I understand it completely.
    
    
    */
    

   Members.update({_id:req.body.id},{
        
        'Firstname':req.body.Firstname,
        'Lastname':req.body.Lastname,
        'Username':req.body.Username,
        'Gender':req.body.Gender,
        'Password':req.body.Password,
        'Email':req.body.Email,
        'Aboutme':req.body.Aboutme,
        'ProfilePicture':req.body.ProfilePicture
       
        
        
        
    },false,true);
    
    Members.findOne({Username:req.body.Username},function(err,data){
        if(err)
            res.send(err);
        else
        {
            res.send(data);
        }
    });
    
    
};

module.exports.getAllMembers=function(req,res){
    
  
     Members.find(function(error,data){  
        
        if(data){
            res.send(data);
        }
        else{
            res.send(error);
            
        }
        
    });
    
    
};


// we need to reset the server for changes in api.js to take effect

module.exports.getMember=function(req,res)

{

        // req.body will get the data send from the user using profile form.
   

         Members.findOne({Username:req.body.userName},function(error,data){  
        
        if(data){
            res.send(data);
        }
        else{
            res.send(error);
            
        }
        
    });
    
};



/* API for setting the default UnLocked Pages at beginning: */

module.exports.UnlockedPagesDefault=function(req,res){
      
    /*  +++++++++++++++++ Zubair Comment 15th April, 2015 +++++++++++++++++++++ 
    
    Below the code has just added two more fields which is just the userEmail and userName.
    Well other fields are as it is, you were right about sending the values from here because after registration we just want a fix thing which is that
    welcome page will be unlocked and other pages will be locked.
    This API is called from the registeration controller so only two fields are sent from there which are email and username and the rest are already
    set here directly.
    
    */
      
      var unlockedPagesDefault=new Unlocked_Pages({
                  
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      stepsWelcome: true,
      stepsAbout: false,
      stepsBoat: false,
      stepsTime: false,
      stepsMobilize: false,
      stepsOrigins: false,
      stepsWhy: false,  
      stepsWrong: false,
      stepsOwned: false,
      stepsDelay: false,
      stepsPortfoolio: false,
      stepsHealth: false,
      stepsPlanB: false,  
      stepsActive: false,
      stepsPassive: false,
      stepsRetire: false,
      stepsResiduals: false,
      stepsRepeat: false,
      stepsLeverage: false,  
      stepsTechie: false,
      stepsSupport: false,
      stepsSeeds: false,
      stepsMiniMe: false,
      stepsSystem: false,
      steps1Hour: false,  
      boatIntro: false,
      boatPaddles: false,
      boatEngines: false,
      boatEngineWt: false,
      boatFuel: false,
      boatCharts: false,
      compassIntro: false,
      compassPaddling: false,
      compassFloat: false,
      compassEngine: false,
      compassCruise: false,
      compassNofool: false,
      compassFreedom: false,
      compassWealth: false,
      compassDreams: false,
      engines: false,
      lake: false,
      ocean: false
                    
                });
                
                unlockedPagesDefault.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('Pages are locked to begin with');
                });
};

module.exports.getMemberUnlockedPages=function(req,res)

{

        /* +++++++++++++++++++++++++ Zubair Comment 18th April, 2015 +++++++++++++++++++++++++++++
        
        This API is used to get the current member's unlocked/locked pages list which is than used for the list of buttons at the top of stepping stones
        page. This API is called as soon as the page loads regardless of any button click or function called, because we need to check the locked/unlocked
        pages status on every page. Controller is the same for all pages.
        
        
        */
   

         Unlocked_Pages.findOne({userName:req.body.userName},function(error,data){  
        
        if(data){
            res.send(data);
        }
        else{
            res.send(error);
            
        }
        
    });
    
};

module.exports.updateUnlockedPages=function(req,res)

{
    
    /* +++++++++++++++++++++++++++++++++ Zubair Comment 18th April, 2015 ++++++++++++++++++++++++++++
    
    This is the main API for our App which will be called when we click the next button along with the 3 parameters (fieldName, field value, page name).
    Actually what I did here is that I have made a general API for the update query which will work for all of our pages or even more. This API is 
    a general API. The code for update is a bit different from the previous APIs. What we usually do is that we call the API like this:
    
     Unlocked_Pages.update({_id:req.body.id},
     
     'stepsAbout':req.body.true
     
     
     false,true);
     
     
     But here if we do the above than this API will be only specific for the stepsAbout or any other page but now what I have done here with the 
     code, API becomes the general now for all pages.
    
    
    */
    
    
        var query={};
      query[req.body.fieldName]=true;
      
      
      
        Unlocked_Pages.update({_id:req.body.id},query,false,true);
    
   
   

         Unlocked_Pages.findOne({_id:req.body.id},function(error,data){  
        
        if(data){
            res.send(data);
        }
        else{
            res.send(error);
            
        }
        
    });
    
};

/*    +++++++++++++++++++++++++++++ Zubair Comment 21st April, 2015 ++++++++++++++++++++++++++++

    Below is the API which I have made for the reset button click and it will reset everything to the default settings. This API is called from the 
    sideBar controller which I have made just now so that all the functions of sidebar will managed from there. I have just send the username with which it will check the current data in the database and will update the 
    fields with the newly send data. 
    It is very much similar to the API which is called after registration but this API is of update query and the previous one was post request.



*/

module.exports.resetMemberUnlockedPages=function(req,res){
      
    Unlocked_Pages.update({userName:req.body.userName},{
        
      'stepsWelcome': true,
      'stepsAbout': false,
      'stepsBoat': false,
      'stepsTime': false,
      'stepsMobilize': false,
      'stepsOrigins': false,
      'stepsWhy': false,  
      'stepsWrong': false,
      'stepsOwned': false,
      'stepsDelay': false,
      'stepsPortfoolio': false,
      'stepsHealth': false,
      'stepsPlanB': false,  
      'stepsActive': false,
      'stepsPassive': false,
      'stepsRetire': false,
      'stepsResiduals': false,
      'stepsRepeat': false,
      'stepsLeverage': false,  
      'stepsTechie': false,
      'stepsSupport': false,
      'stepsSeeds': false,
      'stepsMiniMe': false,
      'stepsSystem': false,
      'steps1Hour': false,  
      'boatIntro': false,
      'boatPaddles': false,
      'boatEngines': false,
      'boatEngineWt': false,
      'boatFuel': false,
      'boatCharts': false,
      'compassIntro': false,
      'compassPaddling': false,
      'compassFloat': false,
      'compassEngine': false,
      'compassCruise': false,
      'compassNofool': false,
      'compassFreedom': false,
      'compassWealth': false,
      'compassDreams': false,
      'engines': false,
      'lake': false,
      'ocean': false
       
        
        
        
    },false,true);
    
       Unlocked_Pages.findOne({userName:req.body.userName},function(err,data){
        if(err)
            res.send(err);
        else
        {
            res.send(data);
        }
    });
   
};

/* +++++++++++++++++++++++++++ Zubair Comment 18th March, 2015 +++++++++++++++++++++++++++++++++

 Here we have used the Api for jobsTotal in which simple data is being taken and saved into the schema, same as we are doing above in members registration 
 and login APIs. 
 
 Note:
 One thing really made me stressed and it was saving an Array of objects into Mongo. It was an easy task well but I haven't done that before so it took me 
 a while to figure it out that how it actually works. So please note that if we want to save an array of objects like we want to have a jobs array 
 with multiple objects of different jobs list containing label, number, data. So in schema.js we have made a simple array conatining objects of String 
 type. And same array is made in the boatController so that it is easy for us to just send a similar array with similar objects name and with same
 data type to Mongo. 
 Like here in schema we have Array 'jobs' and from controller we are sending Array 'allJobs'. Both the arrays are same so it is very easy now to send
 an array of objects. Happy Coding!




*/


module.exports.jobsTotal=function(req,res){
    
      var memberJobs=req.body; 
  
               
                var member_jobs=new Paddles_Boats({
                  
                  userId: memberJobs.userID,
                  username: memberJobs.username,
                  date: memberJobs.date,
                  jobs: memberJobs.allJobs,
                  jobsTotal: memberJobs.allJobsTotal,
                  latestUpdate: memberJobs.latestUpdate
                  
                  
                    
                });
                
                member_jobs.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('Jobs Added Successfully');
                });

         
    
    
};


module.exports.getJob=function(req,res)

{

     
         Paddles_Boats.find({date:req.body.date, userId: req.body.userId},function(error,data){  
        
        if(data){
            res.send(data);
        }
        else{
            res.send(error);
            
        }
        
    });
    
};

module.exports.updateJob=function(req,res)

{
    
            Paddles_Boats.update({_id:req.body.id},
            
            {
                
            'jobsTotal': req.body.newJobsTotal,
            'jobs': req.body.newJobs,
            'latestUpdate' : req.body.latestUpdate
            
            
        },false,true);
    
   
   

         Paddles_Boats.findOne({_id:req.body.id},function(err,data){  
        
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
            
            
        }
        
    });
    
};

/*  ++++++++++++++++++++ Zubair Comment 21/May/2015 ++++++++++++++++++++++++++++++

  Below is the API to get the latest updated or added data 
  from Mongo. The API is simply a POST request which will bring
  the data. 
  
  Explanation:
  
  1) .limit(1) is a mongo function which restricts the response
  data to be only single entry or single object.
  
  2) sort() simply sorts the data with whatever condition 
  we send into the parameter.
  
  3) We are passing "$natural:-1" for the sorting so basically
  this method makes the array sorted with respect to time
  stamp which we have send in the latestUpdate data field.
  
  4) Note here that we are not telling the API to sort the data 
  with respect to the "latestUpdate" field but automatically
  $natural:-1 figures out the time stamp and sort the data.
  
  5) .exec is just to pass the function with error and data
  same like we do in other APIs but there we dont have to use the 
  exec but we directly pass the function. Here we needed the
  .exec for the function. 
  



*/

module.exports.getLatestJob=function(req,res){
    
  Paddles_Boats.find({userId : req.body.userId}).limit(1).sort({$natural:-1})
        .exec(function(err,data){
    if(data){
        
            res.send(data);
        }
        
    else
    
        {
            res.send(err);
            
        }
});
    
    
};


module.exports.weightsTotal=function(req,res){
    
      var weights=req.body; 
  
               
                var member_weights=new Weight_Boats({
                  
                  userId: weights.userID,
                  username: weights.username,
                  date: weights.date,
                  weights: weights.allWeights,
                  weightsTotal: weights.allWeightsTotal,
                  latestUpdate: weights.latestUpdate
                  
                  
                    
                });
                
                member_weights.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('Weights Added Successfully');
                });

         
    
    
};


module.exports.getWeights=function(req,res)

{

     
         Weight_Boats.find({date:req.body.date, userId: req.body.userId},function(error,data){  
        
        if(data){
            res.send(data);
        }
        else{
            res.send(error);
            
        }
        
    });
    
};

module.exports.updateWeights=function(req,res)

{
    
            Weight_Boats.update({_id:req.body.id},
            
            {
                
            'weightsTotal': req.body.newWeightsTotal,
            'weights': req.body.newWeights,
            'latestUpdate' : req.body.latestUpdate
            
            
        },false,true);
    
   
   

         Weight_Boats.findOne({_id:req.body.id},function(err,data){  
        
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
            
            
        }
        
    });
    
};



module.exports.getLatestWeight=function(req,res){
    
  Weight_Boats.find({userId : req.body.userId}).limit(1).sort({$natural:-1})
        .exec(function(err,data){
    if(data){
        
            res.send(data);
        }
        
    else
    
        {
            res.send(err);
            
        }
});
    
    
};

module.exports.roomCreate=function(req,res){
    
    var roomData=req.body;
    
    var chatRoom_data=new Chat_Rooms({
                  
                  RoomID : roomData.RoomID,
                  RoomIcon: roomData.RoomIcon,
                  RoomName: roomData.RoomName,
                  Users: roomData.Users
                  
                    
               
                    
                });
                chatRoom_data.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('Room Created Successfully');
                });

  
  
    
    
};


module.exports.chatCreate=function(req,res){
    
  
  var chatData=req.body;
  
  var chatMessages_data=new Chat_Messages({
      
      RoomID: chatData.RoomID,
      RoomName: chatData.RoomName,
      ChatMessages: chatData.ChatMessages
      
      
  });
  
   chatMessages_data.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('Chat Messages Created Successfully');
                });

  
    
    
};

module.exports.updateChatMessages=function(req,res)

{
    
            Chat_Messages.update({RoomID:req.body.RoomID},
            
            {
            
              'ChatMessages': req.body.ChatMessages  
            
        },false,true);
    
   
   

         Chat_Messages.findOne({RoomID:req.body.RoomID},function(err,data){  
        
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
            
            
        }
        
    });
    
};

module.exports.getChatMessages=function(req,res){
    
  Chat_Messages.findOne({RoomID:req.body.RoomID},function(err,data){  
        
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
            
            
        }
    
  });
    
    
};
