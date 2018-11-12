
let code ;
function showCheck(a,c){
  var ctx = c.getContext("2d");
  ctx.fillStyle = "#0f88eb";
  ctx.clearRect(0,0,1000,1000);
  ctx.font = "80px 'Microsoft Yahei'";
  ctx.fillText(a,0,100);
}
exports.install = function (Vue, options) {
  Vue.prototype.createCode = function (canvas){
      code = "";
      let c = canvas;
      var codeLength = 4;
      var selectChar = new Array(1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','j','k','l','m','n','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
      for(var i=0;i<codeLength;i++) {
          var charIndex = Math.floor(Math.random()*60);
        code +=selectChar[charIndex];
      }
      if(code.length != codeLength){
        this.createCode();
      }
      showCheck(code,c);
      return code;
  },
  Vue.prototype.sucMessage = function (message){
      this.$message({
          message: message,
          type: 'success',
          duration: 1000
      })
  },
  Vue.prototype.sortFtimes = function (a,b){
      return b.fTimes - a.fTimes
  },
  // 防抖
  Vue.prototype.g_debounce = (func, wait = 50, immediate = true) => {
    let timer, context, args
    const later = () => setTimeout(() => {
      timer = null
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
  
    // 这里返回的函数是每次实际调用的函数
    return function(...params) {
      // 如果没有创建延迟执行函数（later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  }
}

