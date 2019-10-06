class Player{
	constructor(){
		this.x = 40;
		this.y = 40;
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
		this.color = "black";
		this.dashbar = this.w;
		this.sprite = new image("assets/player1.png");
		this.hp = 10;
		this.frame = 1;
		this.animationtimer= 10;
		this.sworddist = 40;
		this.sHeight = 10;
		this.jumpcount = this.sHeight;
		this.isswinging = false;
		this.swordpos = [];
	}
	draw(){
		this.animationtimer --;
		this.sprite.img.src = "assets/player"+this.frame.toString()+".png"
		if (this.animationtimer < 0){
			this.frame+=1;
			
			if (this.frame > 4){
				this.frame = 1;
				
			}
			this.animationtimer = 10;
		}
		
		//this.sprite.drawImg(this.x,this.y,this.w,this.h,1,128,32,32,32,1,campos);
		//c.drawImage("assets/player1.png",this.framex,0,32,32,this.x-campos[0],this.y-campos[1],40,40)
		this.sprite.drawImg(this.x-campos[0],this.y-campos[1],40,40,1);
		//drawRect(this.x-campos[0],this.y-campos[1],this.w,this.h,this.color,true);
	}
	input(walls){
		this.radians = Math.atan2(mousePos.y-20+campos[1]-this.y,mousePos.x-20+campos[0]-this.x);
		this.swordpos = [this.x + Math.cos(this.radians)*this.sworddist,this.y+ Math.sin(this.radians)*this.sworddist];
		drawRect(this.swordpos[0]+10-campos[0],this.swordpos[1]+10-campos[1],20,20,"grey",true);
	
		if(mouseButtons[0] && !this.isswinging){
			this.isswinging = true;
		}
		if (this.isswinging){
			if (this.jumpcount > -this.sHeight){
				if (this.jumpcount < 0){
					this.sworddist -= (this.jumpcount ** 2) / 6;
				}else{
					this.sworddist += (this.jumpcount ** 2) / 6;
				}
				this.jumpcount--;
			}else{
				this.isswinging = false;
				this.jumpcount = this.sHeight;
				this.sworddist = 40;
			}
		}



		if (mouseButtons[2] && this.dash && !this.dashing){
            this.dashing = true;
        }
        if (mouseButtons[2] && this.dash && this.dashing){
			drawCircle(this.x-campos[0]+20,this.y-campos[1]+20,150,"grey");
			
            //drawRect(this.x-campos[0] - mousePos.x,this.y - mousePos.y-campos[1],20,20,"black")
            if (Math.hypot(this.x-campos[0]+20 - mousePos.x,this.y +20- mousePos.y-campos[1]) < 150){
                this.dashpos = [mousePos.x+campos[0]-20,mousePos.y+campos[1]-20];
                drawLine(this.x- campos[0]+20,this.y- campos[1]+20,mousePos.x,mousePos.y);
				this.sprite.drawImg(this.dashpos[0]-campos[0],this.dashpos[1]-campos[1],40,40,0.5);
				//drawRect(this.dashpos[0]-campos[0],this.dashpos[1]-campos[1],40,40,this.color);
            }else{
                this.radians = Math.atan2(mousePos.y-20+campos[1]-this.y,mousePos.x-20+campos[0]-this.x);
                //console.log(this.radians);
                this.dashpos = [this.x + Math.cos(this.radians)*150,this.y + Math.sin(this.radians)*150];
                drawLine(this.x- campos[0]+20,this.y- campos[1]+20,this.dashpos[0]+20-campos[0],this.dashpos[1]+20-campos[1]);
				//drawRect(this.dashpos[0]-campos[0],this.dashpos[1]-campos[1],40,40,this.color);
				this.sprite.drawImg(this.dashpos[0]-campos[0],this.dashpos[1]-campos[1],40,40,0.5);
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
		c.save();
		drawRect(this.x-campos[0],this.y-campos[1]-20,40,10,"red",true);
		drawRect(this.x-campos[0],this.y-campos[1]-20,this.dashbar,10,"#56ED97",true);

		c.restore();
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