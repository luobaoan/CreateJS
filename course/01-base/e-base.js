//create by Luo 2014年10月15日2:34:50

//命名空间重命名，为了预防命名冲突createjs注册了自己的命名空间，调用它的类库都需要加上命名空间前缀。
var cjs = createjs;
//创建舞台
/*
 使用的类库，首字母都是大写
 */
var stage = new cjs.Stage("wrap");
//创建容器
var gameContain = new cjs.Container();
//把容器输出到舞台
stage.addChild(gameContain);
//输出文字
var text =  new cjs.Text("hello","20px Arial","#ff0000");//文字内容，文字样式，文字颜色
gameContain.addChild(text);
//输出图形
var rect = new cjs.Shape();//创建图形对象才可以绘制图形
 rect.graphics.beginFill("#ff0000");//设置填充颜色
 rect.graphics.drawRect(0,0,100,100);//画矩形
 gameContain.addChild(rect);//将矩形输出到容器
//输出位图
var bitmap = new cjs.Bitmap("../assets/images/1.jpg");
//console.log(bitmap);
gameContain.addChild(bitmap);

//更新舞台
//stage.update();
//设置监听器，每秒24帧的速度更新舞台
cjs.Ticker.setFPS(24);
cjs.Ticker.addEventListener("tick",stage);//监听器如果传入的是舞台对象，不是函数，那么它监听的是按照帧频更新舞台

 //添加监听事件
/* rect.addEventListener("click",function(){
 alert(123)
 });*/

 //监听获取点击坐标
 rect.addEventListener("click",function(e){
 //console.log(e.localX, e.localY);//获取点击矩形的坐标
 text.x = bitmap.x;
 text.y = bitmap.y;
 });

//来回跑动的动画，通过Ticker计时器执行舞台的实时刷新
cjs.Ticker.setFPS(24);//控制速度，每秒多少帧
cjs.Ticker.addEventListener("tick",moveRect);//括号第一个参数是事件，第二个参数是函数。function会比较复杂，所以抽离到下面进行封装，保证代码的可阅读性
speedX=10;
bitmap.y = 200;
function moveRect(){
if(bitmap.x <= 0){//少于等于0，它就超出左边界
speedX = Math.abs(speedX);
//console.log(bitmap.x,bitmap.y);
}
if(bitmap.x >= 300){//大于等于300,它就超出右边界
speedX = -Math.abs(speedX);
//console.log(bitmap.x,bitmap.y);
}
//console.log(bitmap.x,bitmap.y);
bitmap.x += speedX;
stage.update();
}
