angular.module('starter.controllers', [])

.controller('navCtrl', function($scope, $http, $location, prefix) {
    $(document).on('click', '.nav_item li', function(event) {
        event.preventDefault();
        $(".nav_item li").removeClass('active');
        $(event.currentTarget).addClass('active');
    });
})

//广告计划Ctrl
.controller('advPlanCtrl', function($scope, $http, $location, prefix) {
    var _url = prefix + "getAdvPlan";
    Mock.mock(_url, {
        'list|1-10': [{
            'id|+1': 1,
            'status|1-4': 4,
            'planName': '20160621首焦1油品专题',
            'resourceName': "PC首页焦点图1",
            'startTime': '2016/06/21',
            'stopTime': '不限',
            'area|1': ['中山', '广州', '佛山', '珠海'],
            'youxianji|1-5': 1
        }]
    });
    $http({
            method: 'GET',
            url: _url
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.list = data.data.list;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });

})

//添加计划步骤一
.controller('addPlanStep1Ctrl', function($scope, $http, $location, prefix,$cacheFactory,$state) {
    if(window.cache){
      console.log("存在缓存");
    }
    $scope.selectArea = function() {
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
    };
    $scope.toStep2=function(){
      if(!window.cache){
        window.cache=$cacheFactory('addPlan');                //设置成全局变量来让Step2的控制器调用addPlan缓存，如果在Step2Ctrl中调用$cacheFactory('addPlan')会报addPlan已被使用的Bug
        cache.put('name','mxu');
        $state.go('tab.planEntrance.addPlanStep2');
      }else{
        cache.removeAll();
        cache.put('name','lynn');
        $state.go('tab.planEntrance.addPlanStep2');
      }
    };
    $scope.select_item=function(i){
      if($scope.administration_area[i].isSelect){
        $scope.administration_area[i].isSelect=false;
      }else{
        $scope.administration_area[i].isSelect=true;
      }
    };
    $scope.checkSelectArea=function(i){
      if($scope.administration_area[i].isSelect){
        return "area_name_active";
      }
      return;
    };
    $scope.ensure_area=function(){
      console.log($scope.service_area);
    }
})

//添加计划步骤二
.controller('addPlanStep2Ctrl', function($scope, $http, $location, prefix,$state,$cacheFactory) {
    console.log(cache.get('name'));
    $("[data-toggle='popover']").popover();
    $scope.modal1=function(){
      var _url=prefix+"MaterialList";
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
              console.log(data.data);
              $scope.arr1=data.data.list;
              },
              function errorCallback(data, status, headers, config) {
                  console.log(data);
              });
    };
    $scope.select_pic=function(i){
      if($scope.arr1[i].isSelect){
        $scope.arr1[i].isSelect=false;
      }else{
        $scope.arr1[i].isSelect=true;
      }
    };
    $scope.checkSelect=function(i){
      if($scope.arr1[i].isSelect){
        return "material_item_active";
      }
      return;
    };
    $scope.test1=function(){
      console.log($scope.arr1);
      //each ischecked
    };
    $scope.modal3=function(){
      var _url=prefix+"MaterialList";
      Mock.mock(_url, {
          'list|1-10': [{
              'id|+1': 1,
              'title|1': ['注册与审核','用户登录','用户注册'],
              'previewUrl': 'https://www.baidu.com/img/baidu_jgylogo3.gif',
          }]
      });
      $http({
              method: 'GET',
              url: _url
          })
          .then(function successCallback(data, status, headers, config) {
              console.log(data.data);
              $scope.arr3=data.data.list;
              },
              function errorCallback(data, status, headers, config) {
                  console.log(data);
              });
    };
    $scope.test3=function(){
      console.log($scope.arr3);
      //each ischecked
    };
    $scope.back=function(){
      cache.destroy();
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
    },true);
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
                async: false,                       //后面这几个参数不可缺少
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
    }
})

//广告资源位Ctrl
.controller('advResourceCtrl', function($scope, $http, $location, prefix) {
    var _url = prefix + "getAdvResource";
    Mock.mock(_url, {
        'list|1-10': [{
            'id|+1': 1,
            'resourceName': 'PC首页焦点图轮播',
            'platform': "PC端",
            'width': 760,
            'height': 450,
            'size': '128KB'
        }]
    });
    $http({
            method: 'GET',
            url: _url
        })
        .then(function successCallback(data, status, headers, config) {
                console.log(data.data);
                $scope.list = data.data.list;
            },
            function errorCallback(data, status, headers, config) {
                console.log(data);
            });
})
