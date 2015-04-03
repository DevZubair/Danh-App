// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'mainModule', 'starter.services','appServices','ngCordova'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  $rootScope.$on('$stateChangeSuccess', function(event) {
    //
});
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive - removed by Danh, members page is new abstract: true
  //  .state('tab', {
  //  url: "/tab",
  //  abstract: true,
 //   templateUrl: "templates/tabs.html"
  //  })

  // Each tab has its own nav history stack:


/*                  +++++++++++++++++Zubair Comment++++++++++++++++++++
  Code below is where I changed the routing little bit. Basically what you have done is that you want to have a main
  front page than you want login, register to access from that page. So to achieve this goal, always make the 
  'views' name same for all. This tells the routing that all three pages will access from the same view.
  
  
 

*/
  .state('front', {
    url: '/front',
   
         views: {
    'main': {
        templateUrl: "templates/front.html"
        /* controller: 'FrontCtrl' not created yet */
    }
   }
  })
  
  .state('login', {
    url: '/login',
    views: {
        'main': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
   }
  })
  
  .state('register', {
    url: '/register',
    views: {
      'main': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl' 
      }
    }
  })
  
  .state('members', {
    url: '/members',
    abstract: true,
   views: {
    'main': {
        templateUrl: 'templates/members.html',
         controller: 'MembersCtrl'
     }
    }
  })
  
  
  /* +++++++++++++++++++ Zubair Comment 3/March/2015 +++++++++++++++++++++
    
    Above, I have made the members state a parent state. "abstract : true" means that this state is now a parent
    state and the child states will be referred to as members.chats for example. You can see that 'tabs' state 
    was also a parent state. Please scroll down and see my new comments explaining child states.
  
  */
  
  .state('members.profile', {
      url: '/profile',
      views: {
        'tab-account': {
          templateUrl: 'templates/profile.html',
           controller: 'ProfileCtrl' 
        }
      }
    })
    
  .state('members.support', {
      url: '/suppoort',
      views: {
        'tab-account': {
          templateUrl: 'templates/support.html',
          controller: 'SupportCtrl' 
        }
      }
    })
  
  .state('members.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    
    
    /*  ++++++++++++++++ Zubair Comment 3/March/2015 +++++++++++++++++
    
    Now see above that for chats template, I have written members.chats, the rest remains the same. This means 
    that now this state is a child of members template and will work on the members.html page where we have 
    already defined ion-nav-views with different names respectively for each child. OK
      
    
    */
    
    .state('members.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('members.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('members.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

        .state('members.mission', {
      url: '/mission',
      views: {
        'tab-mission': {
          templateUrl: 'templates/tab-mission.html',
          controller: 'MissionCtrl'
        }
      }
    })

  .state('members.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  

 
     .state('members.boat', {
      url: '/boat',
      views: {
        'tab-mission': {
          templateUrl: 'templates/boat.html',
          controller: 'BoatCtrl'
        }
      }
    })
    
    
  .state('members.steps', {
      url: '/steps',
      views: {
        'tab-mission': {
          templateUrl: 'templates/stepping-stones.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.welcome', {
      url: '/welcome',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-welcome.html'
        //  controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.about', {
      url: '/about',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-about.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.boat', {
      url: '/boat',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-boat.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.time', {
      url: '/time',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-time.html',
          controller: 'StepsCtrl'
        }
      }
    })

  .state('members.steps.mobilize', {
      url: '/mobilize',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-mobilize.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.origins', {
      url: '/origins',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-origins.html',
          controller: 'StepsCtrl'
        }
      }
    })

  .state('members.steps.why', {
      url: '/why',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-why.html',
          controller: 'StepsCtrl'
        }
      }
    })

  .state('members.steps.wrong', {
      url: '/wrong',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-wrong.html',
          controller: 'StepsCtrl'
        }
      }
    })

  .state('members.steps.owned', {
      url: '/owned',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-owned.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.delay', {
      url: '/delay',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-delay.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.portfoolio', {
      url: '/portfoolio',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-portfoolio.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.health', {
      url: '/health',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-health.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.planb', {
      url: '/planb',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-planb.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.active', {
      url: '/active',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-active.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.passive', {
      url: '/passive',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-passive.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.retire', {
      url: '/retire',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-retire.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.residuals', {
      url: '/residuals',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-residuals.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.repeat', {
      url: '/repeat',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-repeat.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.leverage', {
      url: '/leverage',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-leverage.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.techie', {
      url: '/techie',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-techie.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.support', {
      url: '/support',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-support.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.seeds', {
      url: '/seeds',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-seeds.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.mini-me', {
      url: '/mini-me',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-mini-me.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.system', {
      url: '/system',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-system.html',
          controller: 'StepsCtrl'
        }
      }
    })
    
  .state('members.steps.1-hour', {
      url: '/1-hour',
      views: {
        'steps-view': {
          templateUrl: 'templates/steps-1-hour.html',
          controller: 'StepsCtrl'
        }
      }
    })

  .state('members.compass', {
      url: '/compass',
      views: {
        'tab-mission': {
          templateUrl: 'templates/compass.html',
          /* controller: 'CompassCtrl' - did not add yet */
        }
      }
    })


  .state('members.engines', {
      url: '/engines',
      views: {
        'tab-mission': {
          templateUrl: 'templates/engines.html',
          controller: 'EnginesCtrl' 
        }
      }
    })
    
  .state('members.engines.intro', {
      url: '/engines-intro',
      views: {
        'engineview': {
          templateUrl: 'templates/engines-intro.html',
          /* controller: 'EnginesCtrl' - did not add yet */
        }
      }
    })
    
  .state('members.engines.yourengine', {
      url: '/engines-yourengine',
      views: {
        'engineview': {
          templateUrl: 'templates/engines-yourengine.html',
          /* controller: 'EnginesCtrl' - did not add yet */
        }
      }
    })
    
  .state('members.engines.upgrade', {
      url: '/engines-upgrade',
      views: {
        'engineview': {
          templateUrl: 'templates/engines-upgrade.html',
          /* controller: 'EnginesCtrl' - did not add yet */
        }
      }
    })
    
  .state('members.engines.future', {
      url: '/engines-future',
      views: {
        'engineview': {
          templateUrl: 'templates/engines-future.html',
          /* controller: 'EnginesCtrl' - did not add yet */
        }
      }
    })
    
  .state('members.lake', {
      url: '/lake',
      views: {
        'tab-mission': {
          templateUrl: 'templates/lake.html',
          /* controller: 'LakeCtrl' - did not add yet */
        }
      }
    })
    
      .state('members.ocean', {
      url: '/ocean',
      views: {
        'tab-mission': {
          templateUrl: 'templates/ocean.html',
          /* controller: 'OceanCtrl' - did not add yet */
        }
      }
    })
    
      .state('members.boat.1', {
      url: '/boat1',
      views: {
        'boatview': {
          templateUrl: 'templates/boat1.html',
          /* controller: 'Boat1Ctrl' - did not add yet */
        }
      }
    })
    
      .state('members.boat.2', {
      url: '/boat2',
      views: {
        'boatview': {
          templateUrl: 'templates/boat2.html',
          /* controller: 'Boat2Ctrl' - did not add yet */
        }
      }
    })
    
          .state('members.boat.3', {
      url: '/boat3',
      views: {
        'boatview': {
          templateUrl: 'templates/boat3.html',
          /* controller: 'Boat3Ctrl' - did not add yet */
        }
      }
    });
      

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/front');

});
