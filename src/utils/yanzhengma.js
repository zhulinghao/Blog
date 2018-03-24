var code ;
exports.install = function (Vue, options) {
    Vue.prototype.showCheck = function (a,c){
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#0f88eb";
        ctx.clearRect(0,0,1000,1000);
        ctx.font = "80px 'Microsoft Yahei'";
        ctx.fillText(a,0,100);
        
    },
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
        this.showCheck(code,c);
        return code
    },
    Vue.prototype.sucMessage = function (message){
        this.$message({
            message: message,
            type: 'success',
            duration: 1000
        })
    }
}