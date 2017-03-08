var net=document.getElementById("net");
var cube=document.getElementById("cube");
window.onload=function() {
  for(var i=0;i<10;i++) {
    for(var j=0;j<10;j++) {
      var a=document.createElement("div");
      a.className="drawLine";
      a.style.gridColumn=i+2;
      a.style.gridRow=j+2;
      net.appendChild(a);
    }
  }
  //绘制网格线
}
var ctrl=document.getElementById("ctrl");
var command=document.getElementById("command");
var cubePosition= {
  indexX:5,
  indexY:5,
  rotateReg:0
}
//用坐标储存方块的初始位置和方向
function drawCube(cubeP,obj) {
  obj.style.left=(cubeP.indexX*50-250)+"px";
  obj.style.top=(cubeP.indexY*50-250)+"px";
  obj.style.transform="rotate(" + cubeP.rotateReg + "deg)";
}
//根据坐标改变方块位置
drawCube(cubePosition,cube);
function wall(num,wallNum) {
  if(num==wallNum) {
    alert("撞墙啦！");
    return false;
  }
  return true;
}
//判断是否撞墙
function forward(cubeP) {
  var a;
  if(cubeP.rotateReg<0) {
    a=(360-(-cubeP.rotateReg)%360)%360;
  } //在坐标为负数时仍可前进
  else a=cubeP.rotateReg%360;
  switch(a) {
    case 0:if(wall(cubeP.indexY,1)) cubeP.indexY--;break;
    case 90:if(wall(cubeP.indexX,10)) cubeP.indexX++;break;
    case 180:if(wall(cubeP.indexY,10)) cubeP.indexY++;break;
    case 270:if(wall(cubeP.indexX,1)) cubeP.indexX--;break;
                   }
}
//方块执行GO命令改变坐标
function operate (str,cubeP) {
  switch(str) {
    case "GO":forward(cubeP);break;
    case "TUN LEF":cubeP.rotateReg-=90;break;
    case "TUN RIG":cubeP.rotateReg+=90;break;
    case "TUN BAC":cubeP.rotateReg+=180;break;
    case "TRA LEF":if(wall(cubeP.indexX,1)) cubeP.indexX--; break;
    case "TRA TOP":if(wall(cubeP.indexY,1)) cubeP.indexY--;break;
    case "TRA RIG":if(wall(cubeP.indexX,10))cubeP.indexX++;break;
    case "TRA BOT":if(wall(cubeP.indexY,10)) cubeP.indexY++;break;
    case "MOV LEF":cubeP.rotateReg= -90;forward(cubeP);break;
    case "MOV TOP":cubeP.rotateReg=0;forward(cubeP);break;
    case "MOV RIG":cubeP.rotateReg=90;forward(cubeP);break;
    case "MOV BOT":cubeP.rotateReg=180;forward(cubeP);break;
    default: alert("错误的指令！");
          }
}
//执行其它命令改变坐标
ctrl.onclick=function() {
  operate(command.value,cubePosition);
  drawCube(cubePosition,cube);
}
//按钮点击事件
command.onkeypress=function(e) {
  e= e ||window.event;
  if (e.keyCode == 13) {
    operate(command.value,cubePosition);
    drawCube(cubePosition,cube);
  }
}
//增加回车事件