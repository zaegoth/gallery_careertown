angular.module('galleryApp', [
    'ui.bootstrap',
    'ui.router', 
    'galleryResource',
    'galleryControllers',
    'galleryDirectives'
]).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

        
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                template: "",
            })
            .state('gallery', {
                url: "/gallery/:galleryName",
                abstract: true,
                templateUrl: "assets/templates/gallery-tabs.html",
                controller : 'TabsCtrl'
            })
            .state('gallery.view', {
                url: "/view/:tag",
                templateUrl: "assets/templates/gallery-view.html",
                controller: 'ViewCtrl'
            })
            .state('gallery.details', {
                url: "/details",
                templateUrl: "assets/templates/gallery-details.html",
                controller: 'DetailsCtrl'
            });
}]);