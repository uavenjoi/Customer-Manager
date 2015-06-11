angular.module('customersModule',[
    'mongodb-factory'
])
    .directive('customers', function(mongolabFactory, customerFactory,$state){
        return {
            restrict:'E',
            transclude: true,
            templateUrl:'app/Components/customers.html',
            link:function($scope){
                $scope.isCreate=false;
                if(!customerFactory.isLoad)
                  customerFactory.loadCustomers();
                $scope.customers=customerFactory.getCustomers();
                $scope.services = customerFactory.getServices();
                $scope.customer={};
                //console.log( $scope.customers);
                //console.log( $scope.services.addCustomer);

                $scope.openEdit=function(customer){
                    console.log(customer);
                    $scope.customer.firstName=customer.firstName;
                    $scope.customer.lastName=customer.name;
                    $scope.customer.city=customer.city;
                    $scope.isEdit=true;
                    $scope.currentAction='Edit customer';
                    $scope.editedCustomer={}
                };
                $scope.openCreate=function(){
                    $scope.customer.firstName="";
                    $scope.customer.lastName="";
                    $scope.customer.city="";
                    $scope.currentAction='Create customer';
                };
                //$scope.cancelCreate=function(){
                //    $scope.isCreate=false;
                //    $scope.isEdit=false;
                //}
                //$scope.viewOrders=function(customer){
                //    $state.go('detail',{id:customer.id});
                //}
            }
        }
    })
.directive('customerdetail', function($state,$stateParams, customerFactory){
      return{
          restrict:'E',
          transclude: true,
          templateUrl:'app/Components/customer/customer-detail.html',
          link:function($scope){
            $scope.services = customerFactory.getServices();
              var id=$stateParams.id;
            $scope.customer=$scope.services.getCustomerById(parseInt(id));
            $scope.firstName=$scope.customer.firstName;
              $scope.addOrder=function(){
                  console.log($scope.customer);
                  $scope.isCreateOrder=true;

              }
            console.log($scope.customer);
            console.log($scope.customer.orders);
          }
      }
    })
.directive('customerorders',function($state,customerFactory){
        return{
            scope:true,
            templateUrl:'app/Components/customer/customer-orders.html',
            link:function($scope){
                $scope.services = customerFactory.getServices();
                //$scope.editOrder=function(order){
                //    console.log(order);
                //    customerFactory.setCurrentOrder(null);
                // }
            }
        }
    })

.directive('editorder',function($state,$stateParams, customerFactory) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'app/Components/edit/edit.html',
            link: function ($scope) {
                $scope.customerId = $stateParams.customerId;
                // $scope.customers=customerFactory.getCustomers();
                $scope.services = customerFactory.getServices();

                $scope.order = customerFactory.getCurrentOrder();
                $scope.editOrder = function() {
                    customerFactory.setCurrentOrder(null);
                }
            }
        }
    })
.filter('totalSum', function(){
        return function(customer){
            if (typeof customer === 'undefined')  return;
            var sum = 0;
            customer.forEach(function(_o){
                sum = sum + ((_o.price || 0) * (_o.count || 0));
            });
            return sum;
        }
    })