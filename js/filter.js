angular.module('starter.filters', [])
//示例
.filter('topic',function(){
  return function(x){
    if(x){
      var topic="#"+x+"#"
      return topic;
    }
    return;
  }
});
