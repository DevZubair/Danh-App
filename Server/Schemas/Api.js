var mongoose=require('mongoose');
var Members=mongoose.model('Members');
var Jobs=mongoose.model('Jobs');
// var Locked_Pages =mongoose.model ('Locked_Pages');  add this when schema is made and ready to go? Danh


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
  
                

               
               
                var member_jobs=new Jobs({
                  
                  userId: memberJobs.userID,
                  username: memberJobs.username,
                  jobs: memberJobs.allJobs,
                  jobsTotal: memberJobs.allJobsTotal
                  
                  
                    
                });
                
                member_jobs.save(function(error){
                    if(error){
                        res.send(error);

                    }
                    else

                        res.send('Jobs Added Successfully');
                });

         
    
    
};