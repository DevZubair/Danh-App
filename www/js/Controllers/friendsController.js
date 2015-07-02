myMod.controller('FriendsCtrl', function ($scope, Friends, $http, $location, $anchorScroll, $ionicLoading, ionicLoader, $timeout) {

    //$scope.apiUrl = 'http://localhost:3030/handlers/GetTreeMembers.ashx';
     $scope.apiUrl = 'http://test.quietincomes.net/handlers/GetTreeMembers.ashx';
    $scope.memberId = 10000005;

    // hide the tree  
    $scope.tree = false;

    // create for set attr img src
    $scope.arrowImg = null;

 //   ionicLoader.show($ionicLoading);

    $scope.getAllMembers = function () {

        $http.post($scope.apiUrl + '?action=all&memberId=' + $scope.memberId, {

        }).success(function (data) {

            //init upline and downline mebers
            $scope.initUplineMembers(data.uplineMembers);
            $scope.downLineMembers = data.downLineMembers;

            $scope.addDownLineMembers($scope.uplineMembers, "Me");

            $scope.scroll();

            // show the tree
            $scope.tree = true;

            ionicLoader.hide($ionicLoading);

            var treeScroll = document.getElementById('treeScroll');
            treeScroll.getElementsByClassName("scroll")[0].style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(0.5)';
        });
    };

    //get member data on page load
    $scope.getAllMembers();

    //init upline members
    $scope.initUplineMembers = function (uplineMembers) {

        //set upline members relation 
        $scope.setUplineMembersRelation(uplineMembers);

        for (var i = 0; i < uplineMembers.length; i++) {

            uplineMembers[i].src = "../img/arrow-green.png";
            uplineMembers[i].Class = "upline-member";

            $scope.createTreeStructureForUplineMembers(uplineMembers[i], uplineMembers);
        }

        $scope.uplineMembers = uplineMembers;

    };


    $scope.scroll = function () {
        $location.hash('bottom');
        $anchorScroll();
    };


    // get and set subdownLineMembers by member id 
    $scope.getSubDownlineMembers = function (memberId, ignoreId, $event) {
        
        // get img element on which click
        $scope.arrowImg = angular.element($event.target);

        if ($scope.arrowImg.hasClass('loaded')) {

            $scope.toggleDownlineMembers($scope.arrowImg);

            if ($scope.arrowImg.hasClass('hide-sub-members')) {

                $scope.arrowImg.parent().parent().parent().parent().removeClass('active');

                $scope.arrowImg.attr('src', '../img/arrow-green.png');

            } else {
                $scope.arrowImg.attr('src', '../img/arrow-green-up.png');

                $scope.arrowImg.parent().parent().parent().parent().addClass('active');
            }

        }
        else {

            ionicLoader.show($ionicLoading);

            $http.post($scope.apiUrl + '?memberId=' + memberId + '&ignoreId=' + ignoreId, {
            }).success(function (data) {

                // set value of subdownline members
                $scope.subDownLineMembers = data.downLineMembers;

                //  add subdownline members in node  
                $scope.addSubDownLineMembers($scope.uplineMembers, memberId);
                
                $scope.arrowImg.addClass('loaded');
                
                ionicLoader.hide($ionicLoading);
            });
        }

    };

    // set Realtion of upline members
    $scope.setUplineMembersRelation = function (members) {

        for (var i = 0; i < members.length; i++) {
            var count = i + 1;
            var member = members;

            if (member.length == count) {
                member[i].Realtion = "Me";
                member[i].RealtionPrefix = "Gen";
                member[i].RealtionLevel = 1;
            } else {
                member[i].Realtion = "M" + (members.length - count);
                member[i].RealtionPrefix = member[i].Realtion + 'Gen';
                member[i].RealtionLevel = 1;
            }

        }
    }


    // set upline member
    $scope.createTreeStructureForUplineMembers = function (uplineMember, obj) {

        if (!obj.main) {
            obj.main = uplineMember;
            obj.main.node = [];

        } else {

            if (obj.main.node.length == 0) {

                obj.main.node = [{
                    main: uplineMember
                }];

                obj.main.IgnoreId = uplineMember.MemberId;

                obj.main.node[0].main.node = [];
            } else {

                $scope.createTreeStructureForUplineMembers(uplineMember, obj.main.node[0]);
            }
        }
    };

    $scope.toggleDownlineMembers = function ($element) {

        $element.parent().parent().parent().parent().toggleClass('hide-sub-members');

        $element.toggleClass("hide-sub-members");

    };

    // add downlineMembers where relation is Me
    $scope.addDownLineMembers = function (obj, relation) {

        if (obj.main.Realtion == relation) {

            // add new property class in object
            obj.main["Class"] = "active loaded";

            for (var i = 0; i < $scope.downLineMembers.length; i++) {

                $scope.downLineMembers[i].Realtion = "Gen1";
                $scope.downLineMembers[i].RealtionPrefix = "Gen";
                $scope.downLineMembers[i].RealtionLevel = 2;

                $scope.downLineMembers[i].src = "../img/arrow-green.png";

                // add downline members in main 
                obj.main.node.push({
                    main: $scope.downLineMembers[i]
                });

                //  set img src 
                obj.main["src"] = "../img/arrow-green-up.png";

                obj.main["ImgClass"] = "loaded";

                // add node in every downline member
                obj.main.node[i].main.node = [];

            }
        }
        else {
            if (obj.main.node.length) {

                for (var i = 0; i < obj.main.node.length; i++) {
                    $scope.addDownLineMembers(obj.main.node[i], relation);
                }
            }
        }

    };

    $scope.addSubDownLineMembers = function (obj, memberid) {

        if (obj.main.MemberId == memberid) {

            var realtionPrefix = obj.main.RealtionPrefix;
            var realtionLevel = obj.main.RealtionLevel;

            // verify that subdownlineMembers are present or not
            if (obj.main.node.length == 0 || obj.main.node.length == 1) {

                if (obj.main.Realtion == "Me") {

                    obj.main["Class"] = "active";
                }
                else {
                    // check for background set
                    if (obj.main.Class == "subdown-members" || obj.main.Class == "active subdown-members") {

                        obj.main["Class"] = "active subdown-members";
                    }
                    else {
                        // add new property class in object
                        obj.main["Class"] = "active";
                    }

                }

                if (obj.main.node.length == 1) {

                    var uplineMember = document.getElementsByClassName("upline-member");

                    // for add active class in upline member
                    for (var k = 0; k < uplineMember.length; k++) {
                        uplineMember[k].className = uplineMember[k].className + " active";
                    }

                }

                for (var i = 0; i < $scope.subDownLineMembers.length; i++) {

                    $scope.subDownLineMembers[i].Realtion = realtionPrefix + realtionLevel;
                    $scope.subDownLineMembers[i].RealtionPrefix = realtionPrefix;
                    $scope.subDownLineMembers[i].RealtionLevel = parseInt(realtionLevel) + 1;
                   
                    if (obj.main.Realtion == "Me") {
                        $scope.subDownLineMembers[i].Class = "";
                    }
                    if (obj.main.RealtionPrefix == "Gen") {
                        $scope.subDownLineMembers[i].Class = "";
                    }
                    else {
                        $scope.subDownLineMembers[i].Class = "subdown-members";
                    }
                    $scope.subDownLineMembers[i].node = [];

                    $scope.subDownLineMembers[i].src = "../img/arrow-green.png";

                    obj.main.node.push({
                        main: $scope.subDownLineMembers[i]
                    });

                }

                // change image arrow up
                $scope.arrowImg.attr('src', '../img/arrow-green-up.png');

            }
            else {
                // check if realton me click add active class
                if (obj.main.Realtion == "Me") {

                    obj.main["Class"] = "active";
                }
                    // if relation is not me than add class subdown-members
                else {
                    // remove property class in object
                    obj.main["Class"] = "subdown-members";
                }

                obj.main.node.length = 0;

                // change image arrow down
                $scope.arrowImg.attr('src', '../img/arrow-green.png');
            }

        }
        else {
            if (obj.main.node.length) {

                for (var i = 0; i < obj.main.node.length; i++) {
                    $scope.addSubDownLineMembers(obj.main.node[i], memberid);
                }
            }
        }

    };
    

});



