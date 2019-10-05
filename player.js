class Player{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.w = 20;
		this.h = 20;
		this.canmove = true;
		this.movementtimer = 0;
		this.dir = 1;
	}
	draw(){
		drawRect(this.x-campos[0],this.y-campos[1],this.w,this.h,"black",true);
	}
	input(){
		if (Keys["x"]){
			if (this.dir == 1){
				drawRect(this.x-campos[0],this.y-this.h-campos[1],20,20,"grey",true);
			}
			if (this.dir == 2){
				drawRect(this.x+this.w-campos[0],this.y-campos[1],20,20,"grey",true);
			}
			if (this.dir == 3){
				drawRect(this.x-campos[0],this.y+this.h-campos[1],20,20,"grey",true);
			}
			if (this.dir == 4){
				drawRect(this.x-this.w-campos[0],this.y-campos[1],20,20,"grey",true);
			}
		}
		if (Keys["right"] && this.canmove){
			this.x += 20;
			this.dir = 2;
		}
		else if (Keys["left"] && this.canmove){
			this.x -= 20;
			this.dir = 4;
		}
		else if (Keys["up"] && this.canmove){
			this.y -= 20;
			this.dir = 1;
		}
		else if (Keys["down"] && this.canmove){
			this.y += 20;
			this.dir = 3;
		}
		if (Keys["right"] || Keys["left"] || Keys["up"] || Keys["down"]){
			this.canmove = false;
		}
		if (!this.canmove){
			this.movementtimer++;
			if (this.movementtimer > 7){
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