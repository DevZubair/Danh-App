/*  Author: Muhammad Zubair,  Date: 15/June/2015 */


myMod.controller('ChatsCtrl', function($scope, Chats, $http, ionicLoader, $ionicLoading, $ionicScrollDelegate) {


 $scope.chatFriend = localStorage.getItem('chatFriend');
 $scope.currentUser = localStorage.getItem('currentUser');

 $scope.newMessage = {

 };

 $scope.chatMessages = {};
 $scope.allChatMessages = [];

 $scope.socketRoomID = localStorage.getItem('RoomID');

 ionicLoader.show($ionicLoading);
 $http.post('https://danh-app-devzubair.c9.io/api/chatCreate', {

  RoomID: $scope.socketRoomID,
  RoomName: $scope.currentUser + '+' + $scope.chatFriend,
  ChatMessages: $scope.chatMessages


 }).success(function(data) {


  if (data.name != 'ValidationError') {
   console.log('Chat Created!');
   ionicLoader.hide($ionicLoading);
  }

  else {

   console.log('Error! Chat Already Exists!');

   $http.post('https://danh-app-devzubair.c9.io/api/getChatMessages', {

    RoomID: $scope.socketRoomID


   }).success(function(data) {

    console.log('Chat Messages Achieved Successfully!');
    $scope.allChatMessages = data.ChatMessages;

    $ionicScrollDelegate.scrollBottom(true);

    ionicLoader.hide($ionicLoading);

   }).error(function(error) {

    console.log('Chat Messages Error!');
    ionicLoader.hide($ionicLoading);
   });

  }

 }).error(function(error) {

  console.log('CHAT CREATE ERROR');
  ionicLoader.hide($ionicLoading);
 });




 var socket = io.connect('https://danh-app-devzubair.c9.io');
 socket.emit('join', {
  socketRoomID: $scope.socketRoomID
 });






 $scope.sendMessage = function() {


  socket.emit('initiateChat', $scope.newMessage.message, $scope.socketRoomID, $scope.currentUser);
  $scope.newMessage.message = '';


  socket.on('initiateChat', function(msg, sendingUser) {


   if (msg != '') {
    
    $ionicScrollDelegate.scrollBottom(true);
    var d = new Date();

    $scope.chatMessages = {


     message: msg,
     author: sendingUser,
     readBy: [''],
     time: d.getHours() + ':' + d.getMinutes(),
     date: d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()



    };

    $scope.allChatMessages.push($scope.chatMessages);
  //  $scope.$apply($scope.allChatMessages);

   /* $http.post('https://danh-app-devzubair.c9.io/api/updateChatMessages', {

     RoomID: $scope.socketRoomID,
     ChatMessages: $scope.allChatMessages

    }).success(function(data) {

     console.log('Chats Updated!');
     $scope.allChatMessages = data.ChatMessages;


    }).error(function(error) {

     console.log('Chats Update Error!');

    });*/




   }



  });







 };


});