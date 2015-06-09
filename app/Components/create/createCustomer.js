angular.module('createModule',[

])
    .directive('createCustomer',function(){
        return{
            restrict:'E',
            transclude:true,
            templateUrl:'app/Components/create/createCustomer.js',
            link:function(scope){
                console.log('create');
            }
        }
    })
;