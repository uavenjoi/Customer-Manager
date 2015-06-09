angular.module('customersModule',[
    'mongodb-factory'
])
    .directive('customers', function(mongolabFactory,$state){
        return {
            restrict:'E',
            transclude: true,
            templateUrl:'app/Components/customers.html',
            link:function($scope){
                $scope.customers=mongolabFactory.query();
                $scope.addCustomer=function(){
                    var item={id:3,
                        city:$scope.city,
                        gender:'female',
                        firstName:$scope.firstName,
                        name:$scope.lastName,
                        orderCount:45};
                    mongolabFactory.save(item).$promise.then(function(resource){
                        item.id=resource.id;
                        $scope.customers.push(item);
                        $scope.isCreate=false;
                        console.log(resource);
                    });
                };
                $scope.deleteCustomer = function(customer){
                    $scope.customers.splice($scope.customers.indexOf(customer), 1);
                    mongolabFactory.remove({id:customer._id.$oid});
                };
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
                    $state.go('detail',{id:customer._id.$oid});
                }
            }
        }
    })
.directive('customer-detail1', function(){
      return{
          restrict:'E',
          transclude: true,
          scope:true,
          templateUrl:'app/Components/customer/customer-detail.html'
      }

    })