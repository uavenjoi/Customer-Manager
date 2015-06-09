angular.module('editModule',[

])
.directive('editCustomer',function(){
        return{
            restrict:'E',
            transclude:true,
            templateUrl:'app/Components/edit/edit.js',
            link:function(scope){
                console.log('EDIT');
            }
        }
    })
;