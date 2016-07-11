//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
        $scope.city = cityService.city;
        $scope.$watch('city', function () {
            cityService.city = $scope.city;
        });
    }]);
weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', '$routeParams', '$http', function ($scope, $resource, cityService, $routeParams, $http) {
        //function($scope, $resource, weatherService) {
        $scope.city = cityService.city;
        $scope.days = $routeParams.days || '2';
        //This dosent work on cloud 9 due to http vs https
        $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily/', {
            callback: 'JSON_CALLBACK', APPID: 'b4e4ecd77fc06e6944ca938ab6e909be'}, {get: {method: "JSONP"}});
        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});


        $http.jsonp('http://api.openweathermap.org/data/2.5/forecast/daily/', [{q: $scope.city, cnt: $scope.days},
            {callback: 'JSON_CALLBACK', APPID: 'b4e4ecd77fc06e6944ca938ab6e909be'}])
//        $http.get("http://api.openweathermap.org/data/2.5/forecast?q=London&cnt=1&appid=b4e4ecd77fc06e6944ca938ab6e909be")
                .success(function (responce) {
                    console.log(responce);
                })
                .error(function (response, status) {
                    console.log("The request failed with response " + response + " and status code " + status);
                });
        console.log('TO HERE');
//        var Topic = $resource('http://jsonip.com', {method: 'GET'});
//          return $resource(apiBaseUrl + ':path/:subPath?q=:location',

//        var response = Topic.query();
//        response.$promise.then(function (data) {
//            $scope.topics = data.topics; //Changed data.data.topics to data.topics
//        });
//
//
//
//        console.log('Topics')
//        console.log($scope.topics);
//        $scope.ipAPI = $resource('http://jsonip.com', {method: 'GET'});
//        $scope.randomNumbAPI = $resource('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint8', {method: 'GET'});
//        $scope.ip = $scope.ipAPI.get();
//        $scope.randomNumb = $scope.randomNumbAPI.get();
//        $scope.ip.success(function (ip) {
//            console.log("Your name is: " + $scope.ip.ip);
//        });
//        console.log('IP');
//        console.log($scope.ip);
//
//        console.log('Random Numb');
//        console.log($scope.randomNumb);
        //$scope.country = $scope.weatherResult.city.country;
        //$scope.currentTemp = Math.floor($scope.weatherResult.list[0].temp.day*(9/5)-459.67);
        //console.log($scope)

        $scope.country = $scope.weatherResult;
        console.log($scope.weatherResult)

        $scope.convertToFahrenheit = function (degK) {
            return Math.round((9 / 5) * degK - 459.67);
        }

        $scope.convertToDate = function (date) {
            return new Date(date * 1000);
        }

        // 'https://api.openweathermap.org/data/2.5/forecast/daily?APPID=b4e4ecd77fc06e6944ca938ab6e909be'
        // 'http://api.openweathermap.org/data/2.5/forecast?q=$scope.city&appid=b4e4ecd77fc06e6944ca938ab6e909be'
        // 'http://api.openweathermap.org/data/2.5/forecast?q=London&cnt=2&appid=b4e4ecd77fc06e6944ca938ab6e909be'
        // 'http://api.openweathermap.org/data/2.5/forecast/daily'

    }]);