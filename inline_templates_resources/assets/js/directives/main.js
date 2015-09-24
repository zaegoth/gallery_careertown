var galleryDirectives = angular.module('galleryDirectives', []);

//Resources: They need to be global inline JSON for this version of the app
var galleriesResource = [
    {
        "alias" : "nature",
        "title" : "Nature",
        "front" : "image_1.jpeg",
        "storage" : 1
    },
    {
        "alias" : "cities",
        "title" : "Cities",
        "front" : "http://f.fastcompany.net/multisite_files/coexist/imagecache/1280/poster/2012/11/1680856-poster-1280-10-smartest-european-cities-shutterstock-78340003-1.jpg",
        "storage" : 0
    }
]

var imageResource = {
    "nature" : [
        {
            "title" : "Shadow Guy",
            "description" : "A shadowy guy doing shadowy things in the shadows.",
            "storage" : 1,
            "source" : "image_1.jpeg",
            "tags" : ["shadow", "guy", "sunset", "things"]
        },
        {
            "title" : "Sea hills",
            "description" : "Hills by the sea. Oh and a rock thing.",
            "storage" : 1,
            "source" : "image_2.jpeg",
            "tags" : ["sea", "hills", "rock", "cliff"]
        },
        {
            "title" : "Sea snail",
            "description" : "A sea snail. On a plank. Chillin'.",
            "storage" : 1,
            "source" : "image_3.jpeg",
            "tags" : ["sea", "snake", "chill", "art"]
        },
        {
            "title" : "Shadow People",
            "description" : "More shadowy people by the lake.",
            "storage" : 1,
            "source" : "image_4.jpeg",
            "tags" : ["shadow", "people", "lake", "sunset"]
        },
        {
            "title" : "Mountain lake",
            "description" : "So peaceful. Very nice. Lake-y.",
            "storage" : 1,
            "source" : "image_5.jpeg",
            "tags" : ["lake", "mountains", "hills"]
        },
        {
            "title" : "More sea rock things",
            "description" : "Cliffs by the sea. Where geniuses jump from.",
            "storage" : 1,
            "source" : "image_6.jpeg",
            "tags" : ["cliffs", "sea", "sand", "beach"]
        },
        {
            "title" : "Grass sunset",
            "description" : "Well, it's a grass sunset. Shadowy grass sunset.",
            "storage" : 1,
            "source" : "image_7.jpeg",
            "tags" : ["shadow", "grass", "sunset"]
        },
        {
            "title" : "Wow!!!",
            "description" : "Is this the real life? Is this just fantasy? Caught in a landslide, no escape from reality.",
            "storage" : 0,
            "source" : "http://images7.alphacoders.com/428/428211.jpg",
            "tags" : ["queen", "grass", "hills", "mountains", "sunset"]
        }
    ],
    cities : [
        {
            "title" : "Sunset city",
            "description" : "Sunset... or rise over some city. Is that lake Michigan, Chicago?",
            "storage" : 0,
            "source" : "http://f.fastcompany.net/multisite_files/coexist/imagecache/1280/poster/2012/11/1680856-poster-1280-10-smartest-european-cities-shutterstock-78340003-1.jpg",
            "tags" : ["city", "lake", "chicago", "sunset"]
        },
        {
            "title" : "Timelapse city",
            "description" : "You think this is timelapse? Guess again... *cough* Flash *cough*",
            "storage" : 0,
            "source" : "http://images7.alphacoders.com/307/307349.jpg",
            "tags" : ["city", "timelapse", "flash"]
        }
    ]
}


galleryDirectives.directive('galleryView', ['Images', '$modal', '$filter', function(Images, $modal, $filter){
    return {
        restict : 'AE',
        scope : {
            gallery : '=',
            currentTag : '='
        },
        templateUrl : 'assets/templates/directives/gallery-view-directive.html',
        controller : ['$scope', function($scope){
            
            $scope.currentImage = null;
            
            $scope.images = $filter('filter')(imageResource[$scope.gallery], $scope.currentTag, $scope.filterTags);
            $scope.images.map(function(v, i){
                v.id = i;
            });
            
            $scope.imgPath = 'assets/images/' + $scope.gallery + '/';
            $scope.modalInstance = null;
            
            /*Images.get({gallery : $scope.gallery}, function(images){
                
                $scope.images = $filter('filter')(images, $scope.currentTag, $scope.filterTags);
                $scope.images.map(function(v, i){
                    v.id = i;
                });
            });*/
            
            
            $scope.filterTags = function(actual, expected) {
                if(!expected)
                    return true;
                
                if(angular.isObject(actual) && actual.tags.indexOf(expected) >= 0)
                    return true;
                
                return false;
            }
            
            $scope.setCurrent = function(item, openModal) {
                $scope.currentImage = item;
                if(openModal)
                    $scope.openModal();
            }
            
            $scope.openModal = function () {

                $scope.modalInstance = $modal.open({
                    scope : $scope,
                    templateUrl: 'viewModal.html',
                    controller: ['$scope', function ($scope) {
                            
                        $scope.close = function () {
                            $scope.modalInstance.dismiss('cancel');
                        };
                       
                    }]
                });
                
            };
            
        }],
    } 
}]).directive('galleryDetails', ['Images', function(Images){
    return {
        restict : 'AE',
        scope : {
            gallery : '=',
        },
        templateUrl : 'assets/templates/directives/gallery-details-directive.html',
        controller : ['$scope', function($scope){
            
            $scope.images = imageResource[$scope.gallery];
            $scope.imgPath = 'assets/images/' + $scope.gallery + '/';
            
            /*Images.get({gallery : $scope.gallery}, function(images){
                $scope.images = images;
            });*/
        }]
    } 
}]).directive('galleryList', ['Gallery', function(Gallery){
    return {
        restict : 'AE',
        templateUrl : 'assets/templates/directives/gallery-list-directive.html',
        controller : ['$scope', function($scope){
            
            $scope.galleries = galleriesResource;
            $scope.showSelection = true;
            
            /*Gallery.get({}, function(galleries){
                $scope.galleries = galleries;
            });*/
            
            $scope.toggleSelection = function() {
                $scope.showSelection = !$scope.showSelection;
            }
        }]
    } 
}])





