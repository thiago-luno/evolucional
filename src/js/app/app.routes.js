angular.module('myApp').config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $locationProvider.hashPrefix('!');

    $routeProvider
    .when('/', {
        templateUrl: 'views/alunos.html',
        controller: 'estudanteCtrl'
    })

   .when('/alunos', {
        templateUrl: 'views/alunos.html',
        controller: 'estudanteCtrl'
    })

    .when('/professores', {
        templateUrl: 'views/professores.html',
        controller: 'professoresCtrl'
    })

   .otherwise({redirectTo: '/'})
});