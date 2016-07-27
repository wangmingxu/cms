// angular.module('starter', ['starter.controllers', 'starter.services','starter.directives','starter.filters'])
angular.module('starter', ['ui.router','starter.controllers','starter.directives'])

// .constant('prefix', 'http://localhost/')
.constant('prefix', 'http://192.168.17.9:8088/')

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        // setup an abstract state for the tabs directive
            .state('tab', {
            url: '/tab',
            abstract: true, // abstract: true 表明此状态不能被显性激活，只能被子状态隐性激活
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:
        .state('tab.nav', {
                url: '/nav',
                views: {                                      //view 用在该状态下有多个 ui-view 的情况，可以对不同的 ui-view 使用特定的 template
                    'nav': {
                        templateUrl: 'templates/nav.html',
                        controller:'navCtrl'
                    }
                }
            })
            /*资源位管理*/
            // .state('tab.nav.resourceEntrance', {
            //     url: '/resourceEntrance/{terminal}/{pageName}',       //$stateParams获取地址栏的参数值
            //     views: {
            //         'nav_content': {
            //             templateUrl: 'templates/resource_entrance.html',
            //         }
            //     }
            // })
            .state('tab.nav.advertisement', {
                url: '/advertisement/{platform}',
                views: {
                    'resource_kind': {
                        templateUrl: 'templates/adv_resource.html',
                        controller:'advResourceCtrl'
                    }
                }
            })
            .state('tab.nav.article', {
                url: '/article/{platform}',
                views: {
                    'resource_kind': {
                        templateUrl: 'templates/article_resource.html',
                        controller:"articleResourceCtrl"
                    }
                }
            })
            .state('tab.planEntrance', {
                url: '/planEntrance',
                views: {
                    'content': {
                        templateUrl: 'templates/plan_entrance.html',
                        controller:'planEntranceCtrl'
                    }
                }
            })
            .state('tab.index', {
                url: '^/',
                views: {
                    'content': {
                        templateUrl: 'templates/plan_entrance.html',
                        controller:'planEntranceCtrl'
                    }
                }
            })
            .state('tab.planEntrance.planList', {                      //为了保存tab->planEntrance的选中状态，这里要把advPlan作为planEntrance的子状态
                url: '^/tab/planList/{planType}',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/plan_list.html',        //@tab表示使用的是tab的模板（tabs.html），即把tabs.html中的 <div ui-view="content"></div>替换
                        controller:'planListCtrl'
                    }
                }
            })
            .state('tab.planEntrance.addPlanStep1', {
                url: '^/tab/addPlanStep1/{planType}',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/add_plan_step1.html',
                        controller:'addPlanStep1Ctrl'
                    }
                }
            })
            .state('tab.planEntrance.addPlanStep2', {
                url: '^/tab/addPlanStep2',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/add_plan_step2.html',
                        controller:"addPlanStep2Ctrl"
                    }
                }
            })
            .state('tab.materialEntrance', {
                url: '/materialEntrance',
                views: {
                    'content': {
                        templateUrl: 'templates/material_entrance.html',
                    }
                }
            })
            .state('tab.materialEntrance.picMaterial', {
                url: '^/tab/picMaterial',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/pic_material.html',
                        controller:'picMaterialCtrl'
                    }
                }
            })
            .state('tab.materialEntrance.articleMaterial', {
                url: '^/tab/articleMaterial',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/article_material.html',
                        controller:'articleMaterialCtrl'
                    }
                }
            })
            .state('tab.materialEntrance.uploadpic', {
                url: '^/tab/uploadpic',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/uploadpic.html',
                        controller:'uploadpicCtrl'
                    }
                }
            })
            .state('tab.materialEntrance.createArticle', {
                url: '^/tab/createArticle',
                views: {
                    'content@tab': {
                        templateUrl: 'templates/createArticle.html',
                        controller:'createArticleCtrl'
                    }
                }
            })
        // if none of the above states are matched, use this as the fallback
        // $urlRouterProvider.otherwise('/tab/planEntrance');

    });
