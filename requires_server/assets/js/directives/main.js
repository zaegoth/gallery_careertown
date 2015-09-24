var galleryDirectives = angular.module('galleryDirectives', []);

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
            $scope.images = [];
            $scope.imgPath = 'assets/images/' + $scope.gallery + '/';
            $scope.modalInstance = null;
            
            Images.get({gallery : $scope.gallery}, function(images){
                
                $scope.images = $filter('filter')(images, $scope.currentTag, $scope.filterTags);
                $scope.images.map(function(v, i){
                    v.id = i;
                });
            });
            
            
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
            
            $scope.images = [];
            $scope.imgPath = 'assets/images/' + $scope.gallery + '/';
            
            Images.get({gallery : $scope.gallery}, function(images){
                $scope.images = images;
            });
        }]
    } 
}]).directive('galleryList', ['Gallery', function(Gallery){
    return {
        restict : 'AE',
        templateUrl : 'assets/templates/directives/gallery-list-directive.html',
        controller : ['$scope', function($scope){
            
            $scope.galleries = [];
            $scope.showSelection = true;
            
            Gallery.get({}, function(galleries){
                $scope.galleries = galleries;
            });
            
            $scope.toggleSelection = function() {
                $scope.showSelection = !$scope.showSelection;
            }
        }]
    } 
}])





