angular.module('mongodb-factory',['ngResource'])

    .provider('mongolabFactory', function (mongolabConfigs) {
        this.setConfigs = function (_mongolabConfigs) {
            angular.extend(mongolabConfigs, _mongolabConfigs);
        }
        this.$get = function ($resource) {
            var c = mongolabConfigs;
            var url = [c.mongolabUrl, c.dataBase, 'collections', c.collection, ':id'].join('/');
            return $resource(url, {apiKey: c.apiKey}, {
                update: {method: 'PUT'}
            });
        };

    })
    .constant('mongolabConfigs',  {
        mongolabUrl: 'https://api.mongolab.com/api/1/databases',
        collection: 'test-collection2',
        dataBase: null,
        apiKey: null
    })
    .factory('customerFactory',function(mongolabFactory){
        var customers=[];
        var currentCustomer={};
        var addCustomer=function(customer){
            var item={id:customers.length,
                city:customer.city,
                gender:'female',
                firstName:customer.firstName,
                name:customer.lastName,
                orders:[],
                orderCount:0};
            mongolabFactory.save(item).$promise.then(function(resource){
                item.id=resource.id;
                customers.push(item);
                console.log(resource);
            });
        }
        var deleteCustomer = function(customer){
            customers.splice(customers.indexOf(customer), 1);
            mongolabFactory.remove({id:customer._id.$oid});
        };

        var getCustomerById = function(id){
          var _customer={};
            customers.forEach(function(customer){
                if(customer.id===id){
                    _customer=customer;
                }
            })
            currentCustomer=_customer;
            return _customer;
        };

        var addOrder=function(order){
            order.id=1;
            var customer=angular.copy(this);
            currentCustomer.orders.push(angular.copy(order));
           //customer.orders.push(angular.copy(order));
            mongolabFactory.update({id:currentCustomer._id.$oid}, currentCustomer).$promise.then(function(){
                currentCustomer.orders.push(angular.copy(order));
            })
        }

        var services={
            addCustomer:addCustomer,
            deleteCustomer:deleteCustomer,
            getCustomerById:getCustomerById,
            addOrder:addOrder
        }

        this.isLoad=false;
        return {

            add:function(item){
              addCustomer(item);
            },

            getServices:function(){
                return services;
            },
            getCustomers:function(){
              return customers;
            },
            isLoad:this.isLoad,
            loadCustomers:function(){
                var me = this;
                 mongolabFactory.query().$promise.then(function(res){
                    res.forEach(function(customer){
                        customers.push(customer);
                    });
                     me.isLoad=true;
                    return customers;
                })
            }

        }
    })