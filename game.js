//border : 1px solid black; from the canvas
var canvas = document.getElementById("canvasTag");
var c = canvas.getContext("2d"); //c means context
W = 800;
H = 600;
//MOVE THIS TO PLAYER.JS EVENTUALLY//
class Player{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.w = 10;
		this.h = 10;
		this.canmove = true;
		this.movementtimer = 0;
	}
	draw(){
		roundRect(c,this.x,this.y,this.w,this.h,4,true,false);
	}
	input(){
		if (Keys["right"] && this.canmove){
			this.x += 10;
		}
		else if (Keys["left"] && this.canmove){
			this.x -= 10;
		}
		else if (Keys["up"] && this.canmove){
			this.y -= 10;
		}
		else if (Keys["down"] && this.canmove){
			this.y += 10;
		}
		if (Keys["right"] || Keys["left"] || Keys["up"] || Keys["down"]){
			this.canmove = false;
		}
		if (!this.canmove){
			this.movementtimer++;
			if (this.movementtimer > 10){
				this.movementtimer = 0;
				this.canmove = true;
			}
		}
	}
	update(){
		this.input();
		this.draw();
	}
}
//---------------------------------//


player = new Player();
function update(){
	//Refresh screen//
	drawRotatedRect(0+W/2,0+H/2,W,H,"white",0);
	//--------------//
	liftedMouse = false;
	liftedEsc = false;
	player.update();
}

setInterval(update, 1000/60);