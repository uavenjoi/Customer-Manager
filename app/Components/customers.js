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
                //console.log( $scope.customers);
                //console.log( $scope.services.addCustomer);


                $scope.openEdit=function(customer){
                    console.log(customer);
                    $scope.firstName=customer.firstName;
                    $scope.lastName=customer.name;
                    $scope.city=customer.city;
                    $scope.isEdit=true;
                    $scope.currentAction='Edit customer';
                    $scope.editedCustomer={}
                };
                $scope.openCreate=function(){
                    $scope.firstName="";
                    $scope.lastName="";
                    $scope.city="";
                    $scope.isCreate=true;
                    $scope.currentAction='Create customer';
                };
                $scope.cancelCreate=function(){
                    $scope.isCreate=false;
                    $scope.isEdit=false;
                }
                $scope.viewOrders=function(customer){
                    $state.go('detail',{id:customer.id});
                }
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
.directive('orders',function(mongolabFactory,customerFactory){
    return {
        scope:true,
        templateUrl: 'app/Components/orders.html',
        link:function($scope){
            $scope.customers=customerFactory.getCustomers();
            $scope.services = customerFactory.getServices();
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