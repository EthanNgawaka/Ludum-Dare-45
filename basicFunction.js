var canvas = document.getElementById("canvasTag");
var c = canvas.getContext("2d"); //c means context
var mousePos={x:0,y:0};
canvas.addEventListener('mousemove', function(evt) {
	inputPos = getinputPos(canvas, evt);
}, false);

canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
}, false);
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}
canvas.addEventListener("ontouchmove", function(evt){
	inputPos = getinputPos(canvas, evt);
	evt.preventDefault();
	//console.log("touch move");
}, false);
canvas.addEventListener("ontouchstart", function(evt){
	inputPos = getinputPos(canvas, evt);
	evt.preventDefault();
	//console.log("touch start");
}, false);
function drawLine(x1,y1,x2,y2,col){
    c.beginPath();
    c.strokeStyle = col;
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.stroke();
}
var Keys = {"left":false, "right":false, "up":false, "down":false, "space":false, "esc":false,"x":false};

document.addEventListener('keydown', function(event) {
		if(event.keyCode === 37 || event.keyCode === 65) { // left
			Keys["left"] = true;
		}
		else if(event.keyCode === 39 || event.keyCode === 68) { // right
			Keys["right"] = true;
		}
		else if(event.keyCode === 38 || event.keyCode === 87){ // up
			Keys["up"] = true;
		}
		else if(event.keyCode === 40 || event.keyCode === 83){ // down
			Keys["down"] = true;
		}
		else if(event.keyCode === 32){
			Keys["space"] = true;
		}else if(event.keyCode === 27){
			Keys["esc"] = true;
		}else if(event.keyCode === 88){
			Keys["x"] = true;
		}
	}
);
function drawRect(x,y,w,h,col,fill = false){
    
    c.fillStyle = col;
    c.strokeStyle = col;
    //c.fillRect(x,y,w,h);
    c.beginPath();
    c.rect(x,y,w,h);
    if (fill){
        c.fill();
    }
    c.stroke();
    c.closePath();
}
document.addEventListener('keyup', function(event) {
		if(event.keyCode === 37 || event.keyCode === 65) { // left
			Keys["left"] = false;
		}
		else if(event.keyCode === 39 || event.keyCode === 68) { // right
			Keys["right"] = false;
		}
		else if(event.keyCode === 38 || event.keyCode === 87){ // up
			Keys["up"] = false;
		}
		else if(event.keyCode === 40 || event.keyCode === 83){ // down
			Keys["down"] = false;
		}
		else if(event.keyCode === 32){
			Keys["space"] = false;
		}
		else if(event.keyCode === 27){
			Keys["esc"] = false;
			liftedEsc = true;
		}else if(event.keyCode === 88){
			Keys["x"] = false;
		}
	}
);
var liftedMouse = false;
var liftedEsc = false;
mouseButtons = [false, false, false];
document.addEventListener('mousedown', function(event){
	if (event.button == 0){
        mouseButtons[0] = true;
    }
    if (event.button == 1){
        mouseButtons[1] = true;
    }
    if (event.button == 2){
        mouseButtons[2] = true;
    }
});
document.addEventListener('mouseup', function(event){
	if (event.button == 0){
        mouseButtons[0] = false;
    }
    if (event.button == 1){
        mouseButtons[1] = false;
    }
    if (event.button == 2){
        mouseButtons[2] = false;
    }
});
function drawCircle(x,y,r,col){
    c.fillStyle = col;
    c.beginPath();
    c.arc(x,y,r,0,360,false);
    c.closePath();
    c.fill();
}
function AABBCollision(x1,y1,w1,h1,x2,y2,w2,h2){
    if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2){
        return true;
    }else{
        return false;
    }
        
}

function collidePoint(point, rect){
	if(point[0] > rect[0] && point[0] < rect[0] + rect[2] && point[1] > rect[1] && point[1] < rect[1] + rect[3]){
		return true;
	}else{
		return false;
	}
}

function blendCols(col1, col2, per){
	var R = col1[0] + (col2[0] - col1[0])*per;
	var G = col1[1] + (col2[1] - col1[1])*per;
	var B = col1[2] + (col2[2] - col1[2])*per;
	return [R, G, B];
}

class image{
	constructor(imageLocation){
		this.img = new Image();
		this.img.src=imageLocation;
	}	

	drawImg(X,Y,W,H, alpha){
		c.globalAlpha = alpha;
		c.drawImage(this.img, X,Y, W,H);
		c.globalAlpha = 1;
	}

	drawRotatedImg(X, Y, W, H, alpha, rotation, rotateAroundX = 0, rotateAroundY = 0){
		c.save();
		c.translate(X, Y);
		c.rotate(rotation);
		this.drawImg(-rotateAroundX, -rotateAroundY, W, H, alpha);
		c.restore();
	}
}


function midPoint(point1, point2, per){
	var x = point1[0] + (point2[0] - point1[0])*per;
	var y = point1[1] + (point2[1] - point1[1])*per;
	return [x, y];
}

function drawRotatedRect(X, Y, W, H, colour, rotation){
	c.save();
	c.translate(X, Y);
	c.rotate(rotation);
	c.fillStyle = colour;
	c.beginPath();
	c.rect(-W/2,-H/2, W, H);
	c.fill();
	c.restore();
}

function showText(text, X, Y, Size, colour = "rgb(0, 0, 0)", bold = false){
	c.beginPath();
	if(bold === true){
		c.font = "bold "+Size+"px Arial";
	}
	else{
		c.font = Size+"px Arial"
	}
	c.textAlign = "center";
	c.fillStyle=colour;
	c.fillText(text, X, Y);
}

function onScreen(X, Y){
	if(X > 0 && X < canvas.width && Y > 0 && Y < canvas.width){
		return true;
	} else{
		return false;
	}
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
	stroke = true;
  }
  if (typeof radius === 'undefined') {
	radius = 5;
  }
  if (typeof radius === 'number') {
	radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
	var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
	for (var side in defaultRadius) {
	  radius[side] = radius[side] || defaultRadius[side];
	}
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
	ctx.fill();
  }
  if (stroke) {
	ctx.stroke();
  }

}