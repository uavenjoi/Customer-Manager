angular.module('ordersModule',[
    'mongodb-factory'
])
.directive('orders',function(mongolabFactory,customerFactory){
           return {
               restrict: 'E',
               transclude: true,
               templateUrl: 'app/Components/orders.html',
               link:function($scope){
                   $scope.customers=customerFactory.getCustomers();
                   $scope.services = customerFactory.getServices();
               }
           }
    })
//.directive('editOrder',function(){
//    return{
//        restrict:'E',
//        templateUrl:'app/Components/edit/edit.html',
//        link:function($scope){
//
//        }
//    }
//})