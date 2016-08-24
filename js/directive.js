angular.module('starter.directives', [])

.directive('picUpload', function() {
    return {
        restrict: 'EAC',
        require: '?ngModel',
        scope: {
            result: "=pic" //等于号绑定   绑定一个外部Scope的值  result和外部scope的值双向绑定
        },
        template: "<div class='upload_data'>" +
                  "<div class='ipt_left'>上传资料</div>" +
                  "<label for='upload_resource' class='browse_btn'>浏览</label>" +
                  "<input type='file' name='name' value='' class='hide' id='upload_resource'>" +
                  "</div>",
        link: function($scope, $element, $attr, ngModel) {
          $element.bind('change', function(e) {
              var material_item={};
              material_item.file=e.target.files[0];
              var reader = new FileReader();
              reader.onload = function(e) {
                  material_item.base64=e.target.result;
                  var index=$scope.result.length+1;
                  var picTitle=material_item.file.name.replace(".png","").replace(".jpg","").replace(".gif","");
                  material_item.title=picTitle;
                  $scope.result.push(material_item);
                  console.log($scope.result);
                  $scope.$apply(function() {
                          ngModel.$setViewValue($scope.result);
                      })
              };
              reader.readAsDataURL(e.target.files[0]);
          });
        }
    };
})
