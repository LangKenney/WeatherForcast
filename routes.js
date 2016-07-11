//ROUTE PROVIDER
weatherApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'pages/search.html',
                controller: 'homeController'
            })

            .when('/forecast', {
                templateUrl: 'pages/forecast.html',
                controller: 'forecastController'
            })

            .when('/forecast/:days', {
                templateUrl: 'pages/forecast.html',
                controller: 'forecastController'
            })
});