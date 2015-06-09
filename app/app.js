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
    'ordersModule',
    'editModule',
    'createModule'
]).config(function($stateProvider, $urlRouterProvider, mongolabFactoryProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase:'killerdb',
        apiKey:'lb2kRL5a6FkRwkH3vOSAOuPUUDhtCYJ2'
    });
    $stateProvider
        .state('customers',{
            url:'/customers',
            template:'<customers/>'
        })
        //.state('customeredit',{
        //    url:'/customeredit'//,
        //   // template:'<editCustomer/>'
        //})
        .state('customerCreate',{
            url:'/customerCreate',
            template:'<createCustomer/>'
        })
        .state('orders',{
            url:'/orders',
            template:'<orders/>'
        })
    $urlRouterProvider.otherwise('/');
});