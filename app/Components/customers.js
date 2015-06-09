angular.module('customersModule',[
    'mongodb-factory'
])
    .directive('customers', function(mongolabFactory){
        return {
            restrict:'E',
            transclude: true,
            templateUrl:'app/Components/customers.html',
            link:function($scope){
                    $scope.filteredCustomers=[
                    {id:1,city:'Sydney', gender:'male',firstName:'Mark', name:'KK',orderCount:1},
                    {id:2,city:'New york', gender:'female',firstName:'Joe',name:'FF',orderCount:5}];

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
                        console.log(resource);
                    });
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
            }
        }
    })
.directive('createCustomer', function(){
      return{
          restrict:'E',
          templateUrl:'app/Components/create/createCustomer.html'
      }

    })