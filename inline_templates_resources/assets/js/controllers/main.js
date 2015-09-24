var galleryControllers = angular.module('galleryControllers', []);

galleryControllers.controller('TabsCtrl', 
['$scope', '$state', 
    function($scope, $state){
        $scope.$on('$stateChangeSuccess', function(){
            $scope.state = $state.current.name;
        });
}]);

galleryControllers.controller('ViewCtrl', 
['$scope', '$stateParams', 
    function($scope, $stateParams){
        $scope.tag = $stateParams.tag;
        $scope.gallery = $stateParams.galleryName;
}]);

galleryControllers.controller('DetailsCtrl', 
['$scope', '$stateParams', 
    function($scope, $stateParams){
        $scope.gallery = $stateParams.galleryName;
}]);


