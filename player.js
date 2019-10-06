class Player{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.w = 40;
		this.h = 40;
		this.canmove = true;
		this.movementtimer = 0;
		this.dir = 1;
		this.swordtimer = 20;
		this.xv = 0;
		this.yv = 0;
		this.drag = 0.1;
		this.speed = 0.5;
		this.dash = true;
        this.dashcooldown = 5;
        this.dashing = false;
        this.dashpos = [0,0];
	}
	draw(){
		drawRect(this.x-campos[0],this.y-campos[1],this.w,this.h,"black",true);
	}
	input(walls){
		console.log(mousePos);
		if (mouseButtons[2] && this.dash && !this.dashing){
            this.dashing = true;
        }
        if (mouseButtons[2] && this.dash && this.dashing){
			drawCircle(this.x-campos[0]+20,this.y-campos[1]+20,150,"grey");
			
            //drawRect(this.x-campos[0] - mousePos.x,this.y - mousePos.y-campos[1],20,20,"black")
            if (Math.hypot(this.x-campos[0]+20 - mousePos.x,this.y +20- mousePos.y-campos[1]) < 150){
                this.dashpos = [mousePos.x+campos[0]-20,mousePos.y+campos[1]-20];
                drawLine(this.x- campos[0]+20,this.y- campos[1]+20,mousePos.x,mousePos.y);
                drawRect(this.dashpos[0]-campos[0],this.dashpos[1]-campos[1],40,40,this.color);
            }else{
                this.radians = Math.atan2(mousePos.y-20+campos[1]-this.y,mousePos.x-20+campos[0]-this.x);
                //console.log(this.radians);
                this.dashpos = [this.x + Math.cos(this.radians)*150,this.y + Math.sin(this.radians)*150];
                drawLine(this.x- campos[0]+20,this.y- campos[1]+20,this.dashpos[0]+20-campos[0],this.dashpos[1]+20-campos[1]);
                drawRect(this.dashpos[0]-campos[0],this.dashpos[1]-campos[1],40,40,this.color);
            }
            
        }
        if (this.dashing && this.dash && !mouseButtons[2]){
            this.dashbar = 0;
            this.cantdash = false;
            for (var i =0; i < walls.length;i++ ) {
                if (AABBCollision(this.dashpos[0],this.dashpos[1],40,40,walls[i][0],walls[i][1],walls[i][2],walls[i][3])){
                    this.cantdash = true;
                }
              }
            if (!this.cantdash){
                shake = true;
                this.x = this.dashpos[0];
                this.y = this.dashpos[1];
            }
            this.dashing = false;
            this.dash = false;
        }
        if (!this.dash){
            this.dashcooldown-=4;
            this.dashbar += 0.4;
            //console.log("1");
            if(this.dashcooldown <= 0){
                this.dashcooldown = 400;
                this.dashbar = 40

                this.dash = true;
                this.dashing = false;
            }
        }
        //-------//
		/*
		if (Keys["x"] && this.swordtimer == 20){
			this.swordtimer = 0;
		}
		if (this.swordtimer < 10){
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
		*/
		this.x += this.xv;
		for (var x of walls){
			if (AABBCollision(x[0],x[1],x[2],x[3],this.x,this.y,this.w,this.h)){
				if (this.x < x[0]){
					this.x = x[0] - this.w;
					this.xv = 0;
				}else{
					this.x = x[0] + x[2];
					this.xv = 0;
				}
			}
		}
		this.y += this.yv;
		for (var x of walls){
			if (AABBCollision(x[0],x[1],x[2],x[3],this.x,this.y,this.w,this.h)){
				if (this.y < x[1]){
					this.y = x[1] - this.h;
					this.yv = 0;
				}else{
					this.y = x[1] + x[3];
					this.yv = 0;
				}
			}
		}
		this.yv-=this.yv*this.drag;
		this.xv-=this.xv*this.drag;
		if (this.swordtimer < 20){
			this.swordtimer ++;
		}
		if (Keys["right"] && this.canmove){
			this.xv += this.speed;
			this.dir = 2;
		}
		if (Keys["left"] && this.canmove){
			this.xv -= this.speed;
			this.dir = 4;
		}
		if (Keys["up"] && this.canmove){
			this.yv -= this.speed;
			this.dir = 1;
		}
		if (Keys["down"] && this.canmove){
			this.yv += this.speed;
			this.dir = 3;
		}
	}
	update(wallsonscreen){
		this.input(wallsonscreen);
		this.draw();
	}
}