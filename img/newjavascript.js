var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var image = new Image(); 
image.src = "img/terre.png";
image.onload = function() {
  ctx.drawImage(image,90,700); 
};


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


