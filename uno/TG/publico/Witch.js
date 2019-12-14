document.addEventListener('keydown', function(pulsar){
if(pulsar.keyCode == 32){
    console.log("saltar");
    
    if(nivel.muerto == false)
    saltar();
  
}
});
 
var imgBruja,  ImgBat, ImgBat2, ImgBat3, imgNube;

function cargarImagenes() {
    imgNube = new Image();
    imgBruja = new Image();
    ImgBat = new Image();
    ImgBat2 = new Image();
    ImgBat3 = new Image();
    imgNube.src = "img/nube.png";
    imgBruja.src = "img/bruja.png";
    ImgBat.src = "img/bat.png";
    ImgBat2.src = "img/bat2.png";
    ImgBat3.src = "img/bat3.png";

    
    
}


var ancho = 1200;
var alto = 500;

var canvas,ctx;

function inicializar(){
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
cargarImagenes();
}

function borrarCanvas(){
   canvas.width = ancho;
   canvas.height = alto;
}
var suelo = 280;
var bruja = {y: suelo, vy:0, gravedad:0.8, salto:17, vymax:9, saltando: false};
var nivel = {velocidad: 10,  muerto: false};
var puntuacion = 0;
var bat = {x:ancho + 100, y: suelo-0};
var bat2 = {x:ancho + 1100, y: suelo-0};
var bat3 = {x:ancho + 600, y: suelo-0};
var nube = {x:0, y:0, velocidad: 5};


function dibujarNube(){
    ctx.drawImage(imgNube,0,0,8000,600,nube.x,nube.y,10880,600);
}

function logicaNube(){
    if(nube.x < -30000){
        nube.x = ancho +100;
      
    }
    else{
        nube.x -= nube.velocidad;
    }
}


function dibujarBruja() {
//0,0 (posicion de clipping) 64,64 (tamaño) 100,100 (x,y) 50,50 (tamaño reescalar)
ctx.drawImage(imgBruja,0,0,84,84,100,bruja.y,65,65);
}

function dibujarBat() {
ctx.drawImage(ImgBat,0,0,75,48,bat.x,bat.y,65,45);
}

function logicaBat(){
   if(bat.x < -120){
       bat.x = ancho +100;
     puntuacion++;
   }
   else{
       bat.x -= nivel.velocidad;
   }
}

function dibujarBat2() {
    ctx.drawImage(ImgBat2,0,0,75,48,bat2.x,bat2.y,65,45);
    }
    
    function logicaBat2(){
       if(bat2.x < -100){
           bat2.x = ancho +87;
         puntuacion++;
       }
       else{
           bat2.x -= nivel.velocidad;
       }
    }

    function dibujarBat3() {
        ctx.drawImage(ImgBat3,0,0,75,48,bat3.x,bat3.y,65,45);
        }
        
        function logicaBat3(){
           if(bat3.x < -100){
               bat3.x = ancho +100;
             puntuacion++;
           }
           else{
               bat3.x -= nivel.velocidad;
           }
        }


function saltar(){
    bruja.saltando = true;
    bruja.vy = bruja.salto;
}

function gravedad(){
    if(bruja.saltando == true) {

        if(bruja.y - bruja.vy - bruja.gravedad > suelo){
            bruja.saltando= false;
            bruja.vy = 0;
            bruja.y = suelo;
        }
        else{
        bruja.vy -= bruja.gravedad;
        bruja.y -= bruja.vy;
        }
    }
}

function colision(){
   
if(bat.x >= 100 && bat.x <= 165){
  if(bruja.y >= suelo) {
      nivel.muerto = true;
      nivel.velocidad = 0;
      nube.velocidad = 0;
  }
}
}


function colision2(){
   
    if(bat2.x >= 100 && bat2.x <= 165){
      if(bruja.y >= suelo) {
          nivel.muerto = true;
          nivel.velocidad = 0;
          nube.velocidad = 0;
      }
    }
    }

    function colision3(){
   
        if(bat3.x >= 100 && bat3.x <= 165){
          if(bruja.y >= suelo) {
              nivel.muerto = true;
              nivel.velocidad = 0;
              nube.velocidad = 0;
          }
        }
        }

function puntaje(){
    ctx.font = "30px impact";
    ctx.fillStyle = "#ffffff";
    

    if(nivel.muerto == true){
        ctx.font = "60px impact";
        ctx.fillText( `GAME OVER`, 440, 250);
        ctx.fillText( `${puntuacion} `,560,50);
        console.log(puntuacion);
        window.location.assign("http://localhost:3000/formulario.html")
    }
}



//BUCLE PRINCIPAL
var FPS = 50;
setInterval(function(){
    principal();
}, 1000/FPS);


function principal(){
    borrarCanvas();
    gravedad();
    colision();
    colision2();
    colision3();
    logicaNube();
    logicaBat();
    logicaBat2();
    logicaBat3();
    dibujarNube();
    dibujarBat();
    dibujarBat2();
    dibujarBat3();
    dibujarBruja();
    puntaje();
}
