/* 
Projet : jeu portes ouvertes
Auteur : Phil
Date : 02.03.2019
 */

let c = document.getElementById("my_game");
let ctx = c.getContext("2d");
let planetX = 674;
let planetY = 700;
let gatesY = 140;
let gatesY2 = -520;
let score=0;
//Pour changer la difficulté pour la suite du dev en accélerent la vitesse (movePlanetSpeed)
let movePlanetSpeed = 10;

//variable vérification coté perso
let numberLeft = 0;
let numberRight = 0;
//variable pour faire redésendre le perso
let isHeight = false;
let isDown = false;

let succes = true;


let spacePressed = false;
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) { //fontion pour la barre expace
    if(e.keyCode === 32) {
        spacePressed = true;
    }
}


function backgroung(){ //fonction servant a afficher l'arriere plan
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,700,800);
}

function goalGate(){ //fonction servant a afficher les obstacle
    ctx.fillStyle = "red";
    ctx.fillRect(0,gatesY,300,100);
    ctx.fillStyle = "red";
    ctx.fillRect(400,gatesY,300,100);
    
    ctx.fillStyle = "darkblue";
    ctx.fillRect(0,gatesY2,300,100);
    ctx.fillStyle = "darkblue";
    ctx.fillRect(400,gatesY2,300,100);
}

function persoMove(){ //fonction servant a afficher le personnage
    ctx.beginPath();
    ctx.arc(planetX,planetY,20,0,Math.PI*2,true);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function movePersoRL(){  //fonction servant a faire bouger le personnage de gauche a droite
    //vérification pour la direction du perso
    if (planetX===26){
        numberLeft +=1;
    }
    else if (planetX===674){
        numberRight +=1;
    }
    
    if (numberLeft !== numberRight){
        planetX-=6;
    }
    else if(numberLeft === numberRight){
        planetX+=6;
    }
}

function lose(){  //fonction servant a afficher le game over en cas d'échec
    ctx.font = "80pt Calibri,Geneva,Arial";
    ctx.strokeStyle = "red";
    ctx.fillStyle = "rgb(0,20,180)";    
    ctx.fillText("GAME OVER", 70, 400);
    ctx.strokeText("GAME OVER", 70, 400);
    gatesY -=3;
    planetY +=3;
}

function goHeight(){ //fonction servant a faire bouger le personnage en hauteur
    if (planetY === 40){
        spacePressed = false;
    }
    if (spacePressed){ 
        if (succes){
            planetY-=6;
            if (planetY===100){
                score+=1;
            }
        }
        else{
           lose(); 
        }  
    }
    else{
        movePersoRL();
        succes=true;
    }
    
    if (planetY<252){ // Détection collision avec le truc rouge
        if (planetX < 318 || planetX > 382){
            succes = false;
        }
    }
	
}

function draw(){ //fonction servant appeler des autre fontion de mannier répétitif
    ctx.clearRect(0, 0, 700, 800);
    backgroung();
    persoMove(); 
    goalGate();
    goHeight();
    
    
    if (planetY ===40){
        isHeight = true;
    }
    if (planetY === 700){
        isDown = true;
        isHeight = false;
    }
    else{
        isDown = false;
    }
    if (isHeight && isDown === false){
        planetY +=4;
        spacePressed = false;
        gatesY += 4;
        gatesY2 += 4;
    }
    if (gatesY > 772){
        gatesY = -548;
    }
    if (gatesY2 > 772){
        gatesY2 = -548;
    }
    
    ctx.font = "80pt Calibri,Geneva,Arial";
    ctx.strokeStyle = "red";
    ctx.fillStyle = "darkviolet";    
    ctx.fillText(score, 600, 100);
    ctx.strokeText(score, 600, 100);
}
setInterval(draw, movePlanetSpeed);