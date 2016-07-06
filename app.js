var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']);

//ROUTE PROVIDER
weatherApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
     templateUrl: 'pages/search.html',
     controller: 'homeController'
    })
    
    .when('/forcast', {
        templateUrl: 'pages/forcast.html',
        controller: 'forcastController'
    })
})

//SERICES
weatherApp.service('cityService', function(){
   this.city = 'Search for your city first';
});

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    $scope.city - cityService.city;
    
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forcastController',  ['$scope', '$resource','cityService', function($scope, $resource, cityService){
    $scope.city = cityService.city;
    // 'https://api.openweathermap.org/data/2.5/forecast/daily?APPID=b4e4ecd77fc06e6944ca938ab6e909be'
    // 'http://api.openweathermap.org/data/2.5/forecast?q=$scope.city&appid=b4e4ecd77fc06e6944ca938ab6e909be'
    
    //This dosent work on cloud 9 due to http vs https 
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?q=London&cnt=2&appid=b4e4ecd77fc06e6944ca938ab6e909be', {
        callback: 'JSON_CALLBACK'}, {get: {method: "JSONP"}});
        
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 2});
    console.log($scope.weatherResult)
    
}]);