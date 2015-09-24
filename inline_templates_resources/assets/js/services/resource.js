var galleryResource = angular.module('galleryResource', ['ngResource']);

galleryResource.factory('Images', ['$resource',
    function($resource){
        return $resource('assets/resource/images/:gallery.json',{}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
}]);

galleryResource.factory('Gallery', ['$resource',
    function($resource){
        return $resource('assets/resource/galleries.json',{}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
}]);