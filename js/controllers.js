angular.module('starter.controllers', [])

.controller('navCtrl', function($scope, $http, $location, prefix) {
    $(document).on('click', '.nav_item li', function(event) {
        event.preventDefault();
        $(".nav_item li").removeClass('active');
        $(event.currentTarget).addClass('active');
    });
})

//计划入口
.controller('planEntranceCtrl', function($scope, $http, $location, prefix) {
    $scope.enterAdvPlan = function() {
        $location.path('tab/planList/1');
    };
    $scope.enterArticlePlan = function() {
        $location.path('tab/planList/2');
    };
})

//广告计划Ctrl
.controller('planListCtrl', function($scope, $http, $location, prefix, $stateParams) {
    $scope.planType = $stateParams.planType;
    $scope.toAddPlan = function() {
        $location.path("tab/addPlanStep1/" + $scope.planType);
    };
    var _url = prefix + "cms/showPlan/query/showPlans";
    // Mock.mock(_url, {
    //     'list|1-10': [{
    //         'id|+1': 1,
    //         'status|1-4': 4,
    //         'planName': '20160621首焦1油品专题',
    //         'resourceName': "PC首页焦点图1",
    //         'startTime': '2016/06/21',
    //         'stopTime': '不限',
    //         'area|1': ['中山', '广州', '佛山', '珠海'],
    //         'youxianji|1-5': 1
    //     }]
    // });
    $http({
            method: 'GET',
            url: _url
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.list = data.data.model.showPlanDTOList;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });

})

//图片素材列表
.controller('picMaterialCtrl', function($scope, $http, $location, prefix, $cacheFactory, $state) {
    var _url = prefix + 'cms/material/query/materials?materialType=1';
    $http({
            method: 'GET',
            url: _url,
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.list = data.data.model.materialDTOList;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });
})

//文章素材列表
.controller('articleMaterialCtrl', function($scope, $http, $location, prefix, $cacheFactory, $state) {
    var _url = prefix + 'cms/material/query/materials?materialType=2';
    $http({
            method: 'GET',
            url: _url,
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.list = data.data.model.materialDTOList;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });
})

//添加计划步骤一
.controller('addPlanStep1Ctrl', function($scope, $http, $location, prefix, $cacheFactory, $state, $filter, $stateParams) {
    $scope.start_time = new Date();
    $scope.planType = $stateParams.planType;
    if (window.cache) {
        console.log("存在缓存");
        $scope.planName = cache.get('planName');
        $scope.start_time = cache.get('start_time');
        $scope.end_time = cache.get('end_time');
        $scope.planType = cache.get('planType');
        $scope.priority = cache.get('priority');
        $scope.admin_isSelect = JSON.parse(cache.get('admin_isSelect'));
        $scope.serviceArea_selectIndex = JSON.parse(cache.get('serviceArea_selectIndex'));
        $scope.serviceArea_isSelect = JSON.parse(cache.get('serviceArea_isSelect'));
    }
    var getArea_url = prefix + "cms/showPlan/allRegion";
    // Mock.mock(getArea_url, {
    //     'administration_area': ['中山', '广州', '佛山', '珠海', '北京', '天津', '河北', '山西', '内蒙', '上海', '山东', '江苏', '江西', '浙江', '福建', '湖北', '湖南', '河南', '广东'],
    //     'service_area': ['区域一：广东（包括郴州、衡阳、泉州、龙岩、厦门、漳州、江西赣州、海南、广西）', '区域二：湖南（长沙、株洲、娄底、岳阳、萍乡、宜春、湘潭、邵阳、益阳、常德、永州、怀化）', '区域三：福建（福州一区、福州二区、莆田、宁德、三明、南平）', '区域四：杭州'],
    // });
    $http({
            method: 'GET',
            url: getArea_url
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.administration_area = data.data.model.provinceDTOList;
                $scope.service_area = data.data.model.serviceAreaVOList;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });
    $scope.cacheIpt = function(cache) {
        cache.put('planName', $scope.planName);
        var start_time = $filter("date")($scope.start_time, "yyyy-MM-dd");
        var end_time = $filter("date")($scope.end_time, "yyyy-MM-dd");
        cache.put('start_time', start_time);
        cache.put('end_time', end_time);
        cache.put('planType', $scope.planType);
        cache.put('priority', $scope.priority);
        var admin_isSelect = JSON.stringify($scope.admin_isSelect);
        cache.put('admin_isSelect', admin_isSelect);
        var serviceArea_selectIndex = JSON.stringify($scope.serviceArea_selectIndex);
        cache.put('serviceArea_selectIndex', serviceArea_selectIndex);
        var serviceArea_isSelect = JSON.stringify($scope.serviceArea_isSelect);
        cache.put('serviceArea_isSelect', serviceArea_isSelect);
    };
    $scope.toStep2 = function() {
        if (!window.cache) {
            window.cache = $cacheFactory('addPlan'); //设置成全局变量来让Step2的控制器调用addPlan缓存，如果在Step2Ctrl中调用$cacheFactory('addPlan')会报addPlan已被使用的Bug
            $scope.cacheIpt(cache);
            $state.go('tab.planEntrance.addPlanStep2');
        } else {
            cache.removeAll();
            $scope.cacheIpt(cache);
            $state.go('tab.planEntrance.addPlanStep2');
        }
    };
    $scope.admin_isSelect = [];
    $scope.serviceArea_selectIndex = [];
    $scope.select_item = function(i) {
        var index = $scope.admin_isSelect.indexOf($scope.administration_area[i].provinceID);
        if (index == -1) {
            $scope.admin_isSelect.push($scope.administration_area[i].provinceID);
        } else {
            $scope.admin_isSelect.splice(index, 1);
        }
    };
    $scope.AreaClass = function(i) {
        var index = $scope.admin_isSelect.indexOf($scope.administration_area[i].provinceID);
        if (index != -1) {
            return "area_name_active";
        }
        return;
    };
    $scope.ensure_area = function() {
        console.log($scope.serviceArea_isSelect);
    };
    $scope.cancel = function() {
        $scope.admin_isSelect = [];
        $scope.serviceArea_selectIndex = [];
        $scope.serviceArea_isSelect = [];
    };
    $scope.adminAreaName_select = function(id) {
        var index = $scope.admin_isSelect.indexOf(id);
        if (index != -1) {
            return true;
        }
        return false;
    };
    $scope.del_adminArea = function(id) {
        var index = $scope.admin_isSelect.indexOf(id);
        $scope.admin_isSelect.splice(index, 1);
    };
    $scope.del_serviceArea = function(i) {
        $scope.serviceArea_selectIndex[i] = false;
    };
    $scope.$watch('serviceArea_selectIndex', function() {
        $scope.serviceArea_isSelect = [];
        $scope.serviceArea_selectIndex.map(function(item, i) {
            if (item) {
                $scope.serviceArea_isSelect.push($scope.service_area[i].provinceId);
            }
        });
    }, true);
    $scope.serviceAreaName_select = function(id) {
        var index = $scope.serviceArea_isSelect.indexOf(id);
        if (index != -1) {
            return true;
        }
        return false;
    };
})

//添加计划步骤二
.controller('addPlanStep2Ctrl', function($scope, $http, $location, prefix, $state, $cacheFactory) {
    // console.log(JSON.parse(cache.get('admin_isSelect')));
    // console.log(JSON.parse(cache.get('serviceArea_isSelect')));
    // console.log(cache.get('start_time'));
    $("[data-toggle='popover']").popover();
    $scope.getPic = function() {
        var _url = prefix + "MaterialList";
        Mock.mock(_url, {
            'list|6-10': [{
                'id|+1': 1,
                'picUrl': "img/defaultimg.png",
                'materialName': '素材名素材名素素材名素材名...',
            }]
        });
        $http({
                method: 'GET',
                url: _url
            })
            .then(function successCallback(data, status, headers, config) {
                    $scope.picList = data.data.list;
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.getPic();
    $scope.getResource = function() {
        $scope.checked_resource = [];
        var res_url = prefix + 'cms/resource/query/resource';
        Mock.mock(res_url, {
            'list|1-10': [{
                'id|+1': 1,
                'resourcePositionName': 'PC首页焦点图轮播',
                'platform|1': [1, 2, 3, 4],
                'pixelHeight': 760,
                'pixelWidth': 450,
                'size': '128KB'
            }]
        });
        $http({
                method: 'GET',
                url: res_url
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data.data);
                    // $scope.resourceList = data.data.model.resourcePositionDTOList;      //真实数据
                    $scope.resourceList = data.data.list; //模拟数据
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.resource_ensure = function() {
        $scope.resourceList.map(function(item, i) {
            if (item.isChecked) {
                item.picList = $scope.picList;
                $scope.checked_resource.push(item);
            }
        });
    };
    $scope.show_picList = function(i) {
        $scope.temp_index=i;
        $scope.temp_picList=$scope.checked_resource[i].picList;
    };
    $scope.select_pic = function(i) {
        if ($scope.temp_picList[i].isSelect) {
            $scope.temp_picList[i].isSelect = false;
        } else {
            $scope.temp_picList[i].isSelect = true;
        }
    };
    $scope.SelectClass = function(i) {
        if ($scope.temp_picList[i].isSelect) {
            return "material_item_active";
        }
        return;
    };
    $scope.judge_hasSelect = function(i) {
        var count = 0;
        $scope.checked_resource[i].picList.map(function(item, i) {
            if (item.isSelect) {
                count++;
            }
        });
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    };
    $scope.pic_next = function() {
        console.log($scope.temp_picList);
        //each ischecked
        $('#selectPic_Modal').modal('hide');
        $('#editPic_Modal').modal('show');
    };
    $scope.getArticle = function() {
        var _url = prefix + "MaterialList";
        Mock.mock(_url, {
            'list|1-10': [{
                'id|+1': 1,
                'title|1': ['注册与审核', '用户登录', '用户注册'],
                'previewUrl': 'https://www.baidu.com/img/baidu_jgylogo3.gif',
            }]
        });
        $http({
                method: 'GET',
                url: _url
            })
            .then(function successCallback(data, status, headers, config) {
                    $scope.articleList = data.data.list;
                    console.log($scope.articleList);
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.article_ensure = function() {
        console.log($scope.articleList);
        //each ischecked
    };
    $scope.back = function() {
        $state.go('tab.planEntrance.addPlanStep1');
    };
})


//上传图片素材
.controller('uploadpicCtrl', function($scope, $http, $location, prefix, $timeout) {
    //主要上传逻辑由directive中的picUpload指令实现
    $scope.picList = [];
    $scope.delPic = function(i) {
        $scope.picList.splice(i, 1);
    };
    $scope.$watch('picList', function() {
        $scope.restCount = 6 - $scope.picList.length;
    }, true);
    $scope.upload = function() {
        var fd = new FormData();
        for (var i = 0; i < $scope.picList.length; i++) {
            fd.append("file" + i, $scope.picList[i].file);
            fd.append("materialNameList", $scope.picList[i].title);
        }
        fd.append("targetUrl", $scope.targetUrl);
        //  var _url=prefix+"uploadpic"
        var _url = "http://192.168.17.9:8088/cms/material/upload/pictures";
        $.ajax({
                url: _url,
                type: 'POST',
                data: fd,
                async: false, //后面这几个参数不可缺少
                cache: false,
                contentType: false,
                processData: false,
            })
            .done(function() {
                $('#uploadFinish').modal('show');
                $timeout(function() {
                    $('#uploadFinish').modal('hide');
                }, 800);
            })
            .fail(function() {
                $('#uploadFail').modal('show');
                $timeout(function() {
                    $('#uploadFail').modal('hide');
                }, 800);
            });

    };
})

//上传文章素材
.controller('createArticleCtrl', function($scope, $http, $location, prefix) {
    var ue = UE.getEditor('editor');
    $scope.getContent = function() {
        var arr = [];
        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    };
})

//广告资源位Ctrl
.controller('advResourceCtrl', function($scope, $http, $location, prefix, $stateParams) {
    $scope.platform = $stateParams.platform;
    var _url = prefix + "cms/resource/query/resource";
    // Mock.mock(_url, {
    //     'list|1-10': [{
    //         'id|+1': 1,
    //         'resourceName': 'PC首页焦点图轮播',
    //         'platform': "PC端",
    //         'width': 760,
    //         'height': 450,
    //         'size': '128KB'
    //     }]
    // });
    $http({
            method: 'GET',
            url: _url,
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.list = data.data.model.resourcePositionDTOList;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });
})
