angular.module('myApp', ['ngRoute', 'googlechart']);

angular.module('myApp').controller('menu', function($scope, $location) {
    $scope.getClass =  path => {
        return ($location.path().substr(0, path.length) === path) ? 'active' : '';
      }
    
})