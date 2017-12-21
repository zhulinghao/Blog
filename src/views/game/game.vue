<template>
    <div id="header">
        积分: <span id="integral"></span>
        <span id="warning"></span>
        <button id="role">选择角色</button>
        <div id="li">
            <ul>
                <li>忍者</li>
                <li>女王</li>
                <li>卖萌的</li>
            </ul>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'game',
    components: {
    },
    created() {
    },
    methods: {
    },
    mounted () {
        var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* 这是公开访问的图片加载函数, 它接受一个指向图片文件的字符串的数组或者是单个图片的
     * 路径字符串。然后再调用我们私有的图片加载函数。
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* 如果开发者传进来一个图片数组，循环访问每个值，然后调用我们的图片加载器 */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* 如果开发者传进来的不是一个数组，那么就可以认为参数值是一个字符串，
             * 然后立即调用我们的图片加载器即可。
             */
            _load(urlOrArr);
        }
    }

    /* 这是我们私有的图片加载函数， 它会被公有的图片加载函数调用 */
    function _load(url) {
        if(resourceCache[url]) {
            /* 如果这个 URL 之前已经被加载了，那么它会被放进我们的资源缓存数组里面，
             * 然后直接返回那张图片即可。
             */
            return resourceCache[url];
        } else {
            /* 否则， 这个 URL 之前没被加载过而且在缓存里面不存在，那么我们得加载这张图片
             */
            var img = new Image();
            img.onload = function() {
                /* 一旦我们的图片已经被加载了，就把它放进我们的缓存，然后我们在开发者试图
                 * 在未来再次加载这个图片的时候我们就可以简单的返回即可。
                 */
                resourceCache[url] = img;
                /* 一旦我们的图片已经被加载和缓存，调用所有我们已经定义的回调函数。
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* 将一开始的缓存值设置成 false 。在图片的 onload 事件回调被调用的时候会
             * 改变这个值。最后，将图片的 src 属性值设置成传进来的 URl 。
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* 这个函数用来让开发者拿到他们已经加载的图片的引用。如果这个图片被缓存了，
     * 这个函数的作用和在那个 URL 上调用 load() 函数的作用一样。
     */
    function get(url) {
        return resourceCache[url];
    }

    /* 这个函数是否检查所有被请求加载的图片都已经被加载了。
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* 这个函数会在被请求的函数都被加载了这个事件的回调函数栈里面增加一个函数。*/
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* 这个对象通过创造一个公共的资源对象来定义公有的开发者可以访问的函数。*/
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
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
var Engine = (function(global) {
    /* 实现定义我们会在这个作用于用到的变量
     * 创建 canvas 元素，拿到对应的 2D 上下文
     * 设置 canvas 元素的高/宽 然后添加到dom中
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* 这个函数是整个游戏的主入口，负责适当的调用 update / render 函数 */
    function main() {
        /* 如果你想要更平滑的动画过度就需要获取时间间隙。因为每个人的电脑处理指令的
         * 速度是不一样的，我们需要一个对每个人都一样的常数（而不管他们的电脑有多快）
         * 就问你屌不屌！
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* 调用我们的 update / render 函数， 传递事件间隙给 update 函数因为这样
         * 可以使动画更加顺畅。
         */
        update(dt);
        render();

        /* 设置我们的 lastTime 变量，它会被用来决定 main 函数下次被调用的事件。 */
        lastTime = now;

        /* 在浏览准备好调用重绘下一个帧的时候，用浏览器的 requestAnimationFrame 函数
         * 来调用这个函数
         */
        win.requestAnimationFrame(main);
    }

    /* 这个函数调用一些初始化工作，特别是设置游戏必须的 lastTime 变量，这些工作只用
     * 做一次就够了
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* 这个函数被 main 函数（我们的游戏主循环）调用，它本身调用所有的需要更新游戏角色
     * 数据的函数，取决于你怎样实现碰撞检测（意思是如何检测两个角色占据了同一个位置，
     * 比如你的角色死的时候），你可能需要在这里调用一个额外的函数。现在我们已经把这里
     * 注释了，你可以在这里实现，也可以在 app.js 对应的角色类里面实现。
     */
    function update(dt) {
        updateEntities(dt);
        //checkCollisions();
    }

    /* 这个函数会遍历在 app.js 定义的存放所有敌人实例的数组，并且调用他们的 update()
     * 函数，然后，它会调用玩家对象的 update 方法，最后这个函数被 update 函数调用。
     * 这些更新函数应该只聚焦于更新和对象相关的数据/属性。把重绘的工作交给 render 函数。
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* 这个函数做了一些游戏的初始渲染，然后调用 renderEntities 函数。记住，这个函数
     * 在每个游戏的时间间隙都会被调用一次（或者说游戏引擎的每个循环），因为这就是游戏
     * 怎么工作的，他们就像是那种每一页上都画着不同画儿的书，快速翻动的时候就会出现是
     * 动画的幻觉，但是实际上，他们只是不停的在重绘整个屏幕。
     */
    function render() {
        /* 这个数组保存着游戏关卡的特有的行对应的图片相对路径。 */
        var rowImages = [
                'images/water-block.png',   // 这一行是河。
                'images/stone-block.png',   // 第一行石头
                'images/stone-block.png',   // 第二行石头
                'images/stone-block.png',   // 第三行石头
                'images/grass-block.png',   // 第一行草地
                'images/grass-block.png'    // 第二行草地
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* 便利我们上面定义的行和列，用 rowImages 数组，在各自的各个位置绘制正确的图片 */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* 这个 canvas 上下文的 drawImage 函数需要三个参数，第一个是需要绘制的图片
                 * 第二个和第三个分别是起始点的x和y坐标。我们用我们事先写好的资源管理工具来获取
                 * 我们需要的图片，这样我们可以享受缓存图片的好处，因为我们会反复的用到这些图片
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* 这个函数会在每个时间间隙被 render 函数调用。他的目的是分别调用你在 enemy 和 player
     * 对象中定义的 render 方法。
     */
    function renderEntities() {
        /* 遍历在 allEnemies 数组中存放的作于对象然后调用你事先定义的 render 函数 */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* 这个函数现在没干任何事，但是这会是一个好地方让你来处理游戏重置的逻辑。可能是一个
     * 从新开始游戏的按钮，也可以是一个游戏结束的画面，或者其它类似的设计。它只会被 init()
     * 函数调用一次。
     */
    function reset() {
        // 空操作
    }

    /* 紧接着我们来加载我们知道的需要来绘制我们游戏关卡的图片。然后把 init 方法设置为回调函数。
     * 那么党这些图片都已经加载完毕的时候游戏就会开始。
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png'
    ]);
    Resources.onReady(init);

    /* 把 canvas 上下文对象绑定在 global 全局变量上（在浏览器运行的时候就是 window
     * 对象。从而开发者就可以在他们的app.js文件里面更容易的使用它。
     */
    global.ctx = ctx;
})(this);

    }
}
</script>

<style>
    ul,li{
	padding: 0px;
	margin: 0px;
}
b{
	color: red;
}
canvas{
	-webkit-overflow-scrolling: hidden;
	margin-top:-50px;
	position: absolute;
	left: 50%;
	transform: translate(-50%,0);
	z-index: -1;
}
#header{
	height: 65px;
	width: 445px;
	background: dimgray;
	margin: 0 auto;
	border-radius:10px;
	padding: 0 30px 0 30px;
	line-height: 65px;
	color: white;
	z-index: 1;
	position: relative;
}
#warning{
	margin-left: 50px;
}
#role{
	float: right;
	margin-top: 23px;
	background-color: darkgrey;
	color: white;
	border: none;
	cursor: pointer;
	outline: none;
	height: 30px;
	width: 80px;
}
#li{
	width: 100px;
	position: absolute;
	right: 20px;
	top: 60px;
	background: dimgray;
	border-radius: 5px;
	display: none;
}
#li li{
	list-style: none;
	text-align: center;
	height: 50px;
	line-height: 50px;
	cursor: pointer;
	border-radius: 5px;
	
}
#li li:hover{
	background-color: darkgrey;
}
</style>