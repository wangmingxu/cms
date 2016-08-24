angular.module('starter.filters', [])

.filter('ceil',function(){
  return function(x){
    var ceil_num=Math.ceil(x);
    return ceil_num;
  }
});
