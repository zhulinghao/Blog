//清1s后空id为warning的div里面的内容
function warning(str){
	setTimeout(function(){
			$('#warning').html(str);
	},1000);
};
//选择角色
$('#role').click(function(){
	$('#li').slideToggle('slow');
})
$('#li').click(function(){
	$('#li').css('display','none');
});
//获取到填写积分的div，并给初始值0
var score=0;
$('#integral').html(score);
//定义全局变量，一个小块的高度和宽度,每一个敌人和玩家的图片的y都减10
var squareW=101;
var squareH=83;
var mastE=10;
// 这是我们的玩家要躲避的敌人
var Enemy = function(x,y,speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
	this.x = x;
    this.y = y;
    this.speed = speed*3;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
//定义随机数
	var sjNum=Math.round(Math.random()*0.1);
//	console.log(sjNum);
//	console.log(this.y);
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt*this.speed;
    if(this.x>505){
    	this.x=-squareW-squareW*sjNum*100;				//穿过一次canvas后，敌人位置小幅度随机变化
    	this.speed=this.speed*sjNum*10+this.speed;     //穿过一次canvas后，敌人速度小幅度随机变化
    }
//  console.log(Math.abs(this.y-player['y'])===0);
	//判断如果敌人的x坐标减去玩家的x坐标小于75，且敌人和玩家的y坐标相同的情况下，执行复位
   	if (Math.abs(this.x-player['x'])<75 && Math.abs(this.y-player['y'])===0) {
		player['y']=5*squareH-mastE;
		player['x']=2*squareW;
		$('#warning').html('<b>你被花大姐抓走了！</b>');  //在id为warning的div里面输出值
		score=0;									//被敌人抓到积分变为0
		$('#integral').html('0');
		warning(' ');
   	}
};
// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var player = function(x,y){	
	this.x = x;
    this.y = y;
    //选择角色，不知道怎么把这些代码整合起来
    var role=['images/char-horn-girl.png','images/char-princess-girl.png','images/char-cat-girl.png'];
    this.sprite = role[0];
    $('#li li').eq(0).click(function(){
    	player.sprite = role[0];
		$('#warning').html('2333');
		warning('');
	});
	
	$('#li li').eq(1).click(function(){
		player.sprite = role[1];
		$('#warning').html('2333');
		warning('');
	});
	
	$('#li li').eq(2).click(function(){
		player.sprite = role[2];
		$('#warning').html('2333');
		warning('');
	});
    
}

player.prototype.update = function(){
	if(this.y==-10){						//当player移动到蓝色区域时，触发timeout定时器，200ms后回到起始位置
		setTimeout(function(){
			player['y']=5*squareH-mastE;
			player['x']=2*squareW;
		},200);
		score+=1;
		$('#integral').html(score);
		$('#warning').html('成功到达对岸！');
		warning('');
	}
}
player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
player.prototype.handleInput = function (movement) {
	//利用switch语句，还有下面定义好的监听事件，实现player移动
	switch (movement){            
		case 'left':
		if(this.x>0)
		this.x-=squareW;
			break;
		case 'up':
		if(this.y>0)
		this.y-=squareH;
			break;
		case 'right':
		if(this.x<404)
		this.x+=squareW;
			break;
		case 'down':
		if(this.y<380)
		this.y+=squareH;
			break;	
		default:
			break;
	}
}
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [
	new Enemy(-squareW,-mastE+squareH,50),new Enemy(-3*squareW,-mastE+squareH,50),
	new Enemy(-3*squareW,-mastE+squareH*2,60),new Enemy(-6*squareW,-mastE+squareH*2,60),
	new Enemy(-4*squareW,-mastE+squareH*3,60),new Enemy(-8*squareW,-mastE+squareH*3,60),
];
var player = new player(2*squareW,5*squareH-mastE);
var Len=allEnemies.length;
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
