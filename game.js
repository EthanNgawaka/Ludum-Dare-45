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
player = new Player();


function update(){
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
	player.update();
}

setInterval(update, 1000/60);