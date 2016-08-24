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
                    //console.log(data);
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
                    //console.log(data);
                    $scope.getPlan();
                },
                function errorCallback(data, status, headers, config) {

                });
    };
    $scope.stop = function(id) {
        var _url = apiUrl + "cms/showPlan/pause/showPlan";
        $http({
                method: 'GET',
                url: _url,
                params: {
                    showPlanId: id
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    //console.log(data);
                    $scope.getPlan();
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                });
    };
    $scope.getPlan = function(type) {
        $scope.pageSize=15;
        var then_pageIndex;
        switch (type) {
          case 'next':
            then_pageIndex=$scope.cur_pageIndex+1;
            break;
          case 'prev':
            then_pageIndex=$scope.cur_pageIndex-1;
            break;
          default:
            then_pageIndex=0;
        }
        var _url = apiUrl + "cms/showPlan/query/showPlans";
        $http({
                method: 'GET',
                url: _url,
                pageIndex:then_pageIndex,
                pageSize:$scope.pageSize
            })
            .then(function successCallback(data, status, headers, config) {
                    $scope.list = data.data.model.showPlanRowVOList;
                    $scope.totalSize = data.data.model.totalSize;
                    $scope.cur_pageIndex=then_pageIndex;
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                });
    };
    $scope.getPlan();
})

//图片素材列表
.controller('picMaterialCtrl', function($scope, $http, $location, apiUrl, $cacheFactory, $state, picUrl) {
    $scope.getPicList = function(type) {
        $scope.pageSize=15;
        var then_pageIndex;
        switch (type) {
          case 'next':
            then_pageIndex=$scope.cur_pageIndex+1;
            break;
          case 'prev':
            then_pageIndex=$scope.cur_pageIndex-1;
            break;
          default:
            then_pageIndex=0;
        }
        var _url = apiUrl + 'cms/material/query/materials';
        $http({
                method: 'GET',
                url: _url,
                params: {
                    materialType: 1,
                    pageIndex:then_pageIndex,
                    pageSize:$scope.pageSize
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    //console.log(data.data);
                    $scope.list = data.data.model.materialDTOList;
                    $scope.totalSize=data.data.model.totalSize;
                    $scope.cur_pageIndex=then_pageIndex;
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
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
                    //console.log(data);
                    $scope.getPicList();
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
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
                    //console.log(data.data);
                    $scope.list = data.data.model.materialDTOList;
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
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
                    //console.log(data);
                    $scope.getArticleList();
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                });
    };
})

//添加计划步骤一
.controller('addPlanStep1Ctrl', function($scope, $http, $location, apiUrl, $cacheFactory, $state, $filter, $stateParams) {
    $scope.start_time = new Date();
    $scope.end_time = new Date();
    $scope.planType = $stateParams.planType;
    if (window.cache) {
        //console.log("存在缓存");
        $scope.planName = cache.get('planName');
        $scope.start_time = cache.get('start_time');
        $scope.end_time = cache.get('end_time');
        $scope.planType = cache.get('planType');
        $scope.priority = cache.get('priority');
        $scope.admin_isSelect = JSON.parse(cache.get('admin_isSelect'));
        $scope.serviceArea_selectIndex = JSON.parse(cache.get('serviceArea_selectIndex'));
        $scope.serviceArea_isSelect = JSON.parse(cache.get('serviceArea_isSelect'));
    }
    var getArea_url = apiUrl + "cms/showPlan/allRegion"; //可缓存
    $http({
            method: 'GET',
            cache: true,
            url: getArea_url
        })
        .then(function successCallback(data, status, headers, config) {
                //console.log(data.data);
                $scope.administration_area = data.data.model.provinceDTOList;
                $scope.service_area = data.data.model.serviceAreaVOList;
            },
            function errorCallback(data, status, headers, config) {
                //console.log(data);
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
        cache.put('hasAllowNotLimited', $scope.hasAllowNotLimited);
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
    $scope.tabAdmin = function(){
      $scope.inServiceTab=false;
      $scope.inAdminTab=true;
    };
    $scope.tabService = function(){
      $scope.inServiceTab=true;
      $scope.inAdminTab=false;
    };
    $scope.tabAdmin();
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
        //console.log($scope.serviceArea_isSelect);
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
.controller('addPlanStep2Ctrl', function($scope, $http, $location, apiUrl, $state, $cacheFactory, $filter, $timeout, picUrl) {
    $scope.picUrl = picUrl;
    // //console.log(JSON.parse(cache.get('admin_isSelect')));
    // //console.log(JSON.parse(cache.get('serviceArea_isSelect')));
    // $("[data-toggle='popover']").popover();
    $scope.planName = cache.get('planName');
    $scope.start_time = $filter("date")(cache.get('start_time'), "yyyy-MM-dd");
    $scope.end_time = $filter("date")(cache.get('end_time'), "yyyy-MM-dd");
    $scope.planType = cache.get('planType');
    $scope.priority = cache.get('priority');
    $scope.admin_isSelect = JSON.parse(cache.get('admin_isSelect'));
    $scope.serviceArea_isSelect = JSON.parse(cache.get('serviceArea_isSelect'));
    $scope.hasAllowNotLimited = cache.get('hasAllowNotLimited');
    $scope.getAdvResource = function() {
        $scope.checked_resource = [];
        var res_url = apiUrl + 'cms/resource/advertisement/resources';
        $http({
                method: 'GET',
                url: res_url
            })
            .then(function successCallback(data, status, headers, config) {
                    //console.log(data.data);
                    $scope.resourceList = data.data.model.resourcePositionDTOList; //真实数据
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                });
    };
    $scope.resource_ensure = function() {
        $scope.resourceList.map(function(item, i) {
            if (item.isChecked) {
                item.picIdArr=[];
                item.picObjArr=[];
                $scope.checked_resource.push(item);
            }
        });
    };
    $scope.getPic = function(resIndex,type) {
        var _url = apiUrl + "cms/material/query/materials";
        $scope.pageSize=20;
        var then_pageIndex;
        switch (type) {
          case 'next':
            then_pageIndex=$scope.cur_pageIndex+1;
            break;
          case 'prev':
            then_pageIndex=$scope.cur_pageIndex-1;
            break;
          default:
            then_pageIndex=0;
        }
        $scope.temp_resIndex = resIndex;
        $http({
                method: 'GET',
                url: _url,
                params:{
                  materialType:1,
                  pageIndex:then_pageIndex,
                  pageSize:$scope.pageSize
                }
            })
            .then(function successCallback(data, status, headers, config) {
                    var picList = data.data.model.materialDTOList; //真实数据
                    $scope.totalSize=data.data.model.totalSize;
                    $scope.cur_pageIndex=then_pageIndex;
                    // $scope.checked_resource[resIndex].picList=angular.copy(picList);
                    $scope.temp_picList = angular.copy(picList);
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                });
    };
    // $scope.show_picList = function(i) {
    //     $scope.temp_resIndex = i;
    //     $scope.temp_picList = $scope.checked_resource[i].picList;
    // };
    $scope.del_resource = function(resIndex) {
        $scope.checked_resource.splice(resIndex, 1);
    };
    $scope.select_pic = function(id,item) {
        // if ($scope.temp_picList[picIndex].isSelect) {
        //     $scope.temp_picList[picIndex].isSelect = false;
        // } else {
        //     $scope.temp_picList[picIndex].isSelect = true;
        // }
        var isSelect=$scope.checked_resource[$scope.temp_resIndex].picIdArr.indexOf(id);
        if(isSelect==-1){
          $scope.checked_resource[$scope.temp_resIndex].picIdArr.push(id);
          $scope.checked_resource[$scope.temp_resIndex].picObjArr.push(item);
        }else{
          $scope.checked_resource[$scope.temp_resIndex].picIdArr.splice(isSelect,1);
          $scope.checked_resource[$scope.temp_resIndex].picObjArr.splice(isSelect,1);
        }
    };
    $scope.SelectClass = function(id) {
        // if ($scope.temp_picList[i].isSelect) {
        //     return "material_item_active";
        // }
        // return;
        var isActive=$scope.checked_resource[$scope.temp_resIndex].picIdArr.indexOf(id);
        if(isActive!=-1){
          return "material_item_active";
        }
        return;
    };
    $scope.judge_hasSelect = function(resIndex) {
        var count = 0;
        count=$scope.checked_resource[resIndex].picIdArr.length;
        if (count > 0) {
            return true;
        } else {
            return false;
        }
    };
    $scope.disableFinish=function(){
      var isDisable=false;
      try {
        $scope.checked_resource.map(function(item, i) {
          if(item.picIdArr.length===0){
            isDisable=true;
          }
        });
      } catch (e) {
        isDisable=true;
      }
      return isDisable;
    };
    $scope.pic_next = function(resIndex) {
        if (resIndex !== undefined) {
            $scope.temp_resIndex = resIndex;
        }
        // $scope.temp_picList_next=$scope.checked_resource[$scope.temp_resIndex].picObjArr;
        // $scope.checked_resource[$scope.temp_resIndex].picList.map(function(item, i) {
        //     if (item.isSelect) {
        //         $scope.temp_picList_next.push(item);
        //     }
        // });
        // if (!resIndex) {
            $('#selectPic_Modal').modal('hide');
            $('#editPic_Modal').modal('show');
        // } else {
        //     $('#editPic_Modal').modal('show');
        // }
    };
    $scope.del_SelectPic = function(i) {
        $scope.checked_resource[$scope.temp_resIndex].picObjArr.splice(i, 1);
        $scope.checked_resource[$scope.temp_resIndex].picIdArr.splice(i, 1);
    };
    $scope.swapItems = function(arr1, arr2, index1, index2) {
        arr1[index1] = arr1.splice(index2, 1, arr1[index1])[0];
        arr2[index1] = arr2.splice(index2, 1, arr2[index1])[0];
    };
    $scope.move_up = function(arr1, arr2, $index) {
        if ($index === 0) {
            return;
        }
        $scope.swapItems(arr1, arr2, $index, $index - 1);
    };
    $scope.move_down = function(arr1, arr2, $index) {
        if ($index == arr1.length - 1) {
            return;
        }
        $scope.swapItems(arr1, arr2, $index, $index + 1);
    };
    $scope.picSelect_finish = function() {
        // var i = $scope.temp_resIndex;
        // $scope.checked_resource[i].picList = angular.copy($scope.temp_picList_next);
        console.log($scope.checked_resource);
    };
    $scope.picPlan_finish = function() {
        // console.log($scope.checked_resource);
        $scope.resourcePositionMaterialReleaseVOList = [];
        $scope.checked_resource.map(function(item, i) {
            var obj = {};
            obj.resourcePositionId = item.resourcePositionId;
            // obj.materialIdList = [];
            // item.picList.map(function(item, i) {
            //     obj.materialIdList.push(item.materialId);
            // });
            obj.materialIdList=item.picIdArr;
            $scope.resourcePositionMaterialReleaseVOList.push(obj);
        });
        //console.log($scope.resourcePositionMaterialReleaseVOList);
        var data = {
            showPlanName: $scope.planName,
            showPlanType: $scope.planType,
            displayBeginTime: $scope.start_time,
            displayEndTime: $scope.end_time,
            priority: $scope.priority,
            provinceIdListByAdministrative: $scope.admin_isSelect,
            provinceIdListByServiceArea: $scope.serviceArea_isSelect,
            resourcePositionMaterialReleaseVOList: $scope.resourcePositionMaterialReleaseVOList,
            hasAllowNotLimited: $scope.hasAllowNotLimited
        };
        console.log(data); //上传的数据
        var _url = apiUrl + "cms/showPlan/release";
        $http({
                method: 'POST',
                url: _url,
                data: data
            })
            .then(function successCallback(data, status, headers, config) {
                    //console.log(data.data);
                    if (data.data.success) {
                        cache.removeAll();
                        $('#addPlanSuccess').modal('show');
                        $timeout(function() {
                            $('#addPlanSuccess').modal('hide');
                            $timeout(function() {
                              $location.path('tab/planList/1');
                            }, 800);
                        }, 800);
                    }
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                    $('#addPlanFail').modal('show');
                    $timeout(function() {
                        $('#addPlanFail').modal('hide');
                    }, 800);
                });
    };
    $scope.getArticle = function() {
        var _url = apiUrl + "cms/material/query/materials";
        Mock.mock(_url, {
            'list|1-10': [{
                'id|+1': 1,
                'meterialName|1': ['注册与审核', '用户登录', '用户注册'],
                'previewUrl': 'https://www.baidu.com/img/baidu_jgylogo3.gif',
            }]
        });
        $http({
                method: 'GET',
                url: _url,
                params:{materialType:2}
            })
            .then(function successCallback(data, status, headers, config) {
                    $scope.articleList = data.data.list;
                    //console.log($scope.articleList);
                },
                function errorCallback(data, status, headers, config) {
                    //console.log(data);
                });
    };
    $scope.article_ensure = function() {
        //console.log($scope.articleList);
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
        //console.log(arr.join("\n"));
        return content;
    };
})

//广告资源位Ctrl
.controller('advResourceCtrl', function($scope, $http, $location, apiUrl, $stateParams) {
    $scope.platform = $stateParams.platform;
    var _url = apiUrl + "cms/resource/advertisement/resources";
    $http({
            method: 'GET',
            url: _url,
        })
        .then(function successCallback(data, status, headers, config) {
                //console.log(data.data);
                $scope.list = data.data.model.resourcePositionDTOList;
            },
            function errorCallback(data, status, headers, config) {
                //console.log(data);
            });
})

.controller('articleResourceCtrl', function($scope, $http, $location, apiUrl, $stateParams) {

})
