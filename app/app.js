/**
 * Created by Mikhail_Sokolov on 08.06.2015.
 */
'use strict';
angular.module('CustomerManager',[
    'ui.router',
    'ui.bootstrap',
    'mongodb-factory',
    'headerModule',
    'customersModule',
    ,'ordersModule'

]).config(function($stateProvider, $urlRouterProvider, mongolabFactoryProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase:'killerdb',
        apiKey:'lb2kRL5a6FkRwkH3vOSAOuPUUDhtCYJ2'
    });
    $stateProvider
        .state('index',{
            url:'/',
            template:'<customers/>'
        })
        .state('customers',{
            url:'/customers',
            template:'<customers/>'
        })
        .state('orders',{
            url:'/orders',
            template:'<orders/>'
        })
        .state('detail',{
            url:'/detail/:id',
            template:'<customerdetail/>'
        })
        .state('editOrder',{
            url:'/editOrder/:customerId/:orderId',
            template:'<editorder/>'
        })
    $urlRouterProvider.otherwise('/');
});