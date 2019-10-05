//border : 1px solid black; from the canvas
var canvas = document.getElementById("canvasTag");
var c = canvas.getContext("2d"); //c means context

function update(){
	liftedMouse = false;
	liftedEsc = false;
}

setInterval(update, 1000/60);