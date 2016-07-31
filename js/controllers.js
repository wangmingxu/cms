angular.module('starter.controllers', [])

.controller('navCtrl', function($scope, $http, $location, apiUrl) {
    $(document).on('click', '.nav_item li', function(event) {
        event.preventDefault();
        $(".nav_item li").removeClass('active');
        $(event.currentTarget).addClass('active');
    });
})

//计划入口
.controller('planEntranceCtrl', function($scope, $http, $location, apiUrl) {
    $scope.enterAdvPlan = function() {
        $location.path('tab/planList/1');
    };
    $scope.enterArticlePlan = function() {
        $location.path('tab/planList/2');
    };
})

//广告计划Ctrl
.controller('planListCtrl', function($scope, $http, $location, apiUrl, $stateParams) {
    $scope.planType = $stateParams.planType;
    $scope.toAddPlan = function() {
        $location.path("tab/addPlanStep1/" + $scope.planType);
    };
    $scope.delPlan = function(id) {
        var _url = apiUrl + "cms/showPlan/delete/showPlan";
        $http({
                method: 'GET',
                url: _url,
                params: {
                    showPlanId: id
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data);
                    $scope.getPlan();
                },
                function errorCallback(data, status, headers, config) {

                });
    };
    $scope.online = function(i) {
        var _url = apiUrl + "cms/showPlan/immediatelyOnline";
        $http({
                method: 'GET',
                url: _url
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data);
                    $scope.getPlan();
                },
                function errorCallback(data, status, headers, config) {

                });
    };
    $scope.stop=function(id){
      var _url = apiUrl + "cms/showPlan/pause/showPlan";
      $http({
              method: 'GET',
              url: _url,
              params:{showPlanId:id}
          })
          .then(function successCallback(data, status, headers, config) {
                  console.log(data);
                  $scope.getPlan();
              },
              function errorCallback(data, status, headers, config) {
                  console.log(data);
              });
    };
    $scope.getPlan = function() {
        var _url = apiUrl + "cms/showPlan/query/showPlans";
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
                    $scope.list = data.data.model.showPlanRowVOList;
                    $scope.totalSize = data.data.model.totalSize;
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.getPlan();
})

//图片素材列表
.controller('picMaterialCtrl', function($scope, $http, $location, apiUrl, $cacheFactory, $state,picUrl) {
    $scope.getPicList = function() {
        var _url = apiUrl + 'cms/material/query/materials';
        $http({
                method: 'GET',
                url: _url,
                params: {
                    materialType: 1
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data.data);
                    $scope.list = data.data.model.materialDTOList;
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.getPicList();
    $scope.delMaterial = function(id) {
        var del_url = apiUrl + "cms/material/delete/material";
        $http({
                method: 'GET',
                url: del_url,
                params: {
                    materialId: id
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data);
                    $scope.getPicList();
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.preview = function(storageUrl) {
        $scope.picPreviewUrl = picUrl + storageUrl;
    };
})

//文章素材列表
.controller('articleMaterialCtrl', function($scope, $http, $location, apiUrl, $cacheFactory, $state) {
    $scope.getArticleList = function() {
        var _url = apiUrl + 'cms/material/query/materials';
        $http({
                method: 'GET',
                url: _url,
                params: {
                    materialType: 2
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data.data);
                    $scope.list = data.data.model.materialDTOList;
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.getArticleList();
    $scope.delMaterial = function(id) {
        var del_url = apiUrl + "cms/material/delete/material";
        $http({
                method: 'GET',
                url: del_url,
                params: {
                    materialId: id
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data);
                    $scope.getArticleList();
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
})

//添加计划步骤一
.controller('addPlanStep1Ctrl', function($scope, $http, $location, apiUrl, $cacheFactory, $state, $filter, $stateParams) {
    $scope.start_time = new Date();
    $scope.end_time = new Date();
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
    var getArea_url = apiUrl + "cms/showPlan/allRegion";        //可缓存
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
        // var start_time = $filter("date")($scope.start_time, "yyyy-MM-dd");
        // var end_time = $filter("date")($scope.end_time, "yyyy-MM-dd");
        var admin_isSelect = JSON.stringify($scope.admin_isSelect);
        var serviceArea_selectIndex = JSON.stringify($scope.serviceArea_selectIndex);
        var serviceArea_isSelect = JSON.stringify($scope.serviceArea_isSelect);
        cache.put('planName', $scope.planName);
        cache.put('start_time', $scope.start_time);
        cache.put('end_time', $scope.end_time);
        cache.put('planType', $scope.planType);
        cache.put('priority', $scope.priority);
        cache.put('admin_isSelect', admin_isSelect);
        cache.put('serviceArea_selectIndex', serviceArea_selectIndex);
        cache.put('serviceArea_isSelect', serviceArea_isSelect);
        cache.put('hasAllowNotLimited',$scope.hasAllowNotLimited);
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
.controller('addPlanStep2Ctrl', function($scope, $http, $location, apiUrl, $state, $cacheFactory, $filter, $timeout,picUrl) {
    $scope.picUrl = picUrl;
    // console.log(JSON.parse(cache.get('admin_isSelect')));
    // console.log(JSON.parse(cache.get('serviceArea_isSelect')));
    // $("[data-toggle='popover']").popover();
    $scope.planName = cache.get('planName');
    $scope.start_time = $filter("date")(cache.get('start_time'), "yyyy-MM-dd");
    $scope.end_time = $filter("date")(cache.get('end_time'), "yyyy-MM-dd");
    $scope.planType = cache.get('planType');
    $scope.priority = cache.get('priority');
    $scope.admin_isSelect = JSON.parse(cache.get('admin_isSelect'));
    $scope.serviceArea_isSelect = JSON.parse(cache.get('serviceArea_isSelect'));
    $scope.hasAllowNotLimited=cache.get('hasAllowNotLimited');
    $scope.getPic = function() {
        var _url = apiUrl + "cms/material/query/materials?materialType=1";
        // Mock.mock(_url, {
        //     'list|6-10': [{
        //         'materialId|+1': 1,
        //         'storageUrl': "img/defaultimg.png",
        //         'materialName|1': ['素材名素材名素素材名素材名1...','素材名素材名素素材名素材名2...','素材名素材名素素材名素材名3...','素材名素材名素素材名素材名4...'],
        //     }]
        // });
        $http({
                method: 'GET',
                url: _url
            })
            .then(function successCallback(data, status, headers, config) {
                    // $scope.picList = data.data.list;  //模拟数据
                    $scope.picList = data.data.model.materialDTOList; //真实数据
                    console.log($scope.picList);
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.getPic();
    $scope.getAdvResource = function() {
        $scope.checked_resource = [];
        var res_url = apiUrl + 'cms/resource/advertisement/resources';
        // Mock.mock(res_url, {
        //     'list|1-10': [{
        //         'id|+1': 1,
        //         'resourcePositionName': 'PC首页焦点图轮播',
        //         'platform|1': [1, 2, 3, 4],
        //         'pixelHeight': 760,
        //         'pixelWidth': 450,
        //         'size': '128KB'
        //     }]
        // });
        $http({
                method: 'GET',
                url: res_url
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data.data);
                    $scope.resourceList = data.data.model.resourcePositionDTOList; //真实数据
                    // $scope.resourceList = data.data.list; //模拟数据
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                });
    };
    $scope.resource_ensure = function() {
        $scope.resourceList.map(function(item, i) {
            if (item.isChecked) {
                item.picList = angular.copy($scope.picList); //!!!!!!引用数据类型要用copy
                $scope.checked_resource.push(item);
            }
        });
    };
    $scope.show_picList = function(i) {
        $scope.temp_index = i;
        $scope.temp_picList = $scope.checked_resource[i].picList;
    };
    $scope.del_resource = function(i) {
        $scope.checked_resource.splice(i, 1);
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
    $scope.pic_next = function(i) {
        $scope.temp_picList_next = [];
        var temp_index;
        if (i !== undefined) {
            $scope.temp_index = i;
        }
        $scope.checked_resource[$scope.temp_index].picList.map(function(item, i) {
            if (item.isSelect) {
                $scope.temp_picList_next.push(item);
            }
        });
        if (!i) {
            $('#selectPic_Modal').modal('hide');
            $('#editPic_Modal').modal('show');
        } else {
            $('#editPic_Modal').modal('show');
        }
    };
    $scope.del_SelectPic = function(i) {
        $scope.temp_picList_next.splice(i, 1);
    };
    $scope.swapItems = function(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };
    $scope.move_up = function(arr, $index) {
        if ($index === 0) {
            return;
        }
        $scope.swapItems(arr, $index, $index - 1);
    };
    $scope.move_down = function(arr, $index) {
        if ($index == arr.length - 1) {
            return;
        }
        $scope.swapItems(arr, $index, $index + 1);
    };
    $scope.picSelect_finish = function() {
        var i = $scope.temp_index;
        $scope.checked_resource[i].picList = angular.copy($scope.temp_picList_next);
        console.log($scope.checked_resource);
    };
    $scope.picPlan_finish = function() {
        console.log($scope.checked_resource);
        $scope.resourcePositionMaterialReleaseVOList = [];
        $scope.checked_resource.map(function(item, i) {
            var obj = {};
            obj.resourcePositionId = item.resourcePositionId;
            obj.materialIdList = [];
            item.picList.map(function(item, i) {
                obj.materialIdList.push(item.materialId);
            });
            $scope.resourcePositionMaterialReleaseVOList.push(obj);
        });
        console.log($scope.resourcePositionMaterialReleaseVOList);
        var data = {
            showPlanName: $scope.planName,
            showPlanType: $scope.planType,
            displayBeginTime: $scope.start_time,
            displayEndTime: $scope.end_time,
            priority: $scope.priority,
            provinceIdListByAdministrative: $scope.admin_isSelect,
            provinceIdListByServiceArea: $scope.serviceArea_isSelect,
            resourcePositionMaterialReleaseVOList: $scope.resourcePositionMaterialReleaseVOList,
            hasAllowNotLimited:$scope.hasAllowNotLimited
        };
        console.log(data); //上传的数据
        var _url = apiUrl + "cms/showPlan/release";
        $http({
                method: 'POST',
                url: _url,
                data: data
            })
            .then(function successCallback(data, status, headers, config) {
                    console.log(data.data);
                    if (data.data.success) {
                        $('#addPlanSuccess').modal('show');
                        $timeout(function() {
                            $('#addPlanSuccess').modal('hide');
                        }, 800);
                    }
                },
                function errorCallback(data, status, headers, config) {
                    console.log(data);
                    $('#addPlanFail').modal('show');
                    $timeout(function() {
                        $('#addPlanFail').modal('hide');
                        $timeout(function() {
                            $location.path('tab/planList/'+$scope.planType);
                        }, 500);
                    }, 800);
                });
    };
    $scope.getArticle = function() {
        var _url = apiUrl + "cms/material/query/materials?materialType=2";
        Mock.mock(_url, {
            'list|1-10': [{
                'id|+1': 1,
                'meterialName|1': ['注册与审核', '用户登录', '用户注册'],
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
.controller('uploadpicCtrl', function($scope, $http, $location, apiUrl, $timeout) {
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
        //  var _url=apiUrl+"uploadpic"
        var _url = apiUrl + "cms/material/upload/pictures";
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
.controller('createArticleCtrl', function($scope, $http, $location, apiUrl) {
    var ue = UE.getEditor('editor');
    $scope.getContent = function() {
        var arr = [];
        var content = UE.getEditor('editor').getContent();
        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
        arr.push("内容为：");
        arr.push(content);
        // alert(arr.join("\n"));
        console.log(arr.join("\n"));
        return content;
    };
})

//广告资源位Ctrl
.controller('advResourceCtrl', function($scope, $http, $location, apiUrl, $stateParams) {
    $scope.platform = $stateParams.platform;
    var _url = apiUrl + "cms/resource/advertisement/resources";
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

.controller('articleResourceCtrl', function($scope, $http, $location, apiUrl, $stateParams) {

})
