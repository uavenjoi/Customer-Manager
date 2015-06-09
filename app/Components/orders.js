angular.module('ordersModule',[
    'mongodb-factory'
])
.directive('orders',function(){
           return {
               restrict: 'E',
               transclude: true,
               templateUrl: 'app/Components/orders.html'
           }
    });