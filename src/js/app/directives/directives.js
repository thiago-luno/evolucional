angular.module('myApp').directive('selectDegrees', function(serverAPI){
    return {
        template: `
        <select ng-model="degreeSelect" ng-change="clear()" ng-options="degree as degree.name for degree in degrees">
            <option value="">Escolha a série</option>
        </select>`,
        restrict: 'AE',
        link: function (scope) {
            serverAPI.getDegrees().then( data => {
                scope.degrees = data;
            })             
        }
    };
});

angular.module('myApp').directive('selectClasses', function(serverAPI){
    return {
        template: `
        <select ng-model="classesSelect" ng-options="class as class.name for class in classes">
            <option value="">Escolha a classe</option>
        </select>`,
        restrict: 'AE',
        link: function (scope) {
            serverAPI.getClasses().then( data => {
                scope.classes = data;
            }) 
        }
    };
});

angular.module('myApp').directive('formTeacher', function(){
    return {
        templateUrl: "views/cadastro-professor.html",
        restrict: 'AE',
    };
});




