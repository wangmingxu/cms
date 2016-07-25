angular.module('starter.services', [])
//示例
.factory('Pusher',function(){
  return {
  GetPush:function(subscribe,event,callback){
      if(!window.pusher){
        Pusher.log = function(message) {
          if (window.console && window.console.log) {
            window.console.log(message);
          }
        };

        window.pusher = new Pusher('27e8868aa3f9903b5947', {
          encrypted: true
        });

        // var channel = pusher.subscribe('test_channel');
        var channel = pusher.subscribe(subscribe);
        channel.bind(event,callback);
      }
  }
}
})
