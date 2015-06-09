angular.module('headerModule',[])
    .directive('header',function(){
        return{
            restrict:"E",
            transclude: true,
            templateUrl: 'app/header/header.html',
            link: function(scope){
                scope.appTitle = 'Customer Manager';
            }
        }
    });