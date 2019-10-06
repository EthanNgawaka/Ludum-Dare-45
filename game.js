//border : 1px solid black; from the canvas
var canvas = document.getElementById("canvasTag");
var c = canvas.getContext("2d"); //c means context
W = 800;
H = 600;
var campos = [0,0];
var tcampos = [0,0];
var shakepos = [0,0];
var shake = false;
var shaketimes = 0;
var wallsonscreen = [[100,100,100,100],[-400,-400,400,800]];
var swarmenemies = [];
player = new Player();

document.addEventListener('contextmenu', event => event.preventDefault());

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
 }

class basicEnemy{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.target = [player.x,player.y];
        this.speed = 1;
        this.invulnerable = false;
        this.counter = 0;
        this.hp = 2;

    }
    draw(){
        console.log(this.x-campos[0],this.y+10-campos[1]);
        drawRect(this.x-campos[0],this.y+10-campos[1],this.w/2*this.hp,10,"green",true);
        drawRect(this.x-campos[0],this.y-campos[1],this.w,this.h,"red",true);
    }
    swarm(){
        for (var x of swarmenemies){
            if (Math.hypot(this.x-x.x,this.y-x.y) > 100){
                this.target = [x.x+Math.random()*30,x.y+Math.random()*30];
                
            }else{
                this.target = [player.x+Math.random()*50,player.y+Math.random()*50];
            }
        }
        this.radians = Math.atan2(this.target[1]-this.y,this.target[0]-this.x);
        this.x += Math.cos(this.radians) * this.speed;
        for (var x of swarmenemies){
            if (AABBCollision(this.x,this.y,this.w,this.h,x.x,x.y,x.w,x.h)&&!(this.x==x.x&&this.y==x.y)){
                if (this.x < x.x){
                    this.x = x.x - this.w;
                }else{
                    this.x = x.x+x.w;
                }
            }
        }
        this.y += Math.sin(this.radians) * this.speed;
        for (var x of swarmenemies){
            if (AABBCollision(this.x,this.y,this.w,this.h,x.x,x.y,x.w,x.h)&&!(this.x==x.x&&this.y==x.y)){
                if (this.y < x.y){
                    this.y = x.y - this.h;
                }else{
                    this.y = x.y+x.h;
                }
            }
        }
        if (AABBCollision(this.x,this.y,this.w,this.h,player.x,player.y,player.w,player.h)){
            player.hp-=1;
        }
        if (AABBCollision(this.x,this.y,this.w,this.h,player.swordpos[0]+10,player.swordpos[1]+10,20,20)&&player.isswinging&&!this.invulnerable){
            this.hp --;
            this.invulnerable = true;
            //player.jumpcount = -10;
        }
        if (this.hp <= 0){
            swarmenemies = arrayRemove(swarmenemies,this);
        }
        if (this.invulnerable){
            this.counter ++;
            if (this.counter >= 20){
                this.invulnerable = false;
            }
        }
        
        
    }
}
function update(){
    if(Keys["space"]){
        swarmenemies.push(new basicEnemy(Math.random()*600,Math.random()*600));
    }
	//Camera handling//
    tcampos[0] += (Math.round(player.x) - campos[0] - W/2) / 5 + shakepos[0];
    tcampos[1] += (Math.round(player.y) - campos[1] - H/2) / 5 + shakepos[1];
    campos = [Math.round(tcampos[0]), Math.round(tcampos[1])];
    //Screenshake//
    if (shake){
        if (Math.random() > 0.5){
            shakepos[0] = -(Math.random()*3);
        }else{
            shakepos[0] = (Math.random()*3);
        }
        if (Math.random() > 0.5){
            shakepos[1] = -(Math.random()*3);
        }else{
            shakepos[1] = (Math.random()*3);
        }
        shaketimes++;

        if (shaketimes > 15){
            shake = false;
			shaketimes = 0;
			shakepos = [0,0];
        }
    }
	//Refresh screen//
	drawRect(0,0,W,H,"white",true);
	liftedMouse = false;
	liftedEsc = false;
    player.update(wallsonscreen);
    for (var x =0; x < wallsonscreen.length; x++){
        drawRect(wallsonscreen[x][0]-campos[0],wallsonscreen[x][1]-campos[1],wallsonscreen[x][2],wallsonscreen[x][3],"black",true);
    }
    for (var x = 0; x < player.hp; x++){
        roundRect(c,x*15+20,20,20,40,10,true,true,"red");
    }
    for (var x of swarmenemies){
        x.swarm();
        x.draw();
    }
}

setInterval(update, 1000/60);