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

                $scope.openEdit=function(customer){
                    console.log(customer);
                    $scope.customer=customer;
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

                  customerFactory.setCurrentOrder(null);
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
                $scope.services = customerFactory.getServices();

                $scope.order = customerFactory.getCurrentOrder();
                $scope.isEditOrder= $scope.order? true: false;

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