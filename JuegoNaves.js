var posHeroY = 200;
var dt = 100; // Tiempo de refresco en milisegundos.
var enemySpeed = 50000; // pixeles por segundo
var ms2sec = 1000; // Para pasar de segundos a milisegundos.
var canvas;
var ctx;
var shapes = [];
const desp = 25;
var count = 1;
var level = 1;
var heal = 3;
var modulo = 8;
var leftLimit = -10;
var scale = 40;
var enemyShip = new Image();
var heroShip = new Image();

function Hero(id, y, rad, color){
    this.id = id;
    this.x = rad;
    this.y = y;
    this.rad = rad;
    this.color = color;

    this.draw = function(){
        heroShip.src = "Game_Fighter.png";
        ctx.drawImage(heroShip, this.x, this.y, scale, scale);
    }

    this.move = function(despY){
        this.y = this.y + despY;
        if((this.y) < 0){
            this.y = 5;
        }
        if((this.y + scale) >= canvas.height){
            this.y = canvas.height - (scale + 5);
        }
        //drawShapes();
    }
}

function Enemy(id, x, y, sx, sy, color){
    this.id = id;
    this.x = x;
    this.y = y;
    this.sx = sx;
    this.sy = sy;
    this.color = color;
    
    this.draw = function(){
        if((this.y + this.sy) < canvas.height ){
            enemyShip.src = "starship.png";
            ctx.drawImage(enemyShip, this.x, this.y, this.sx, this.sy);
        }else{
            this.y = canvas.height - this.sy;
            enemyShip.src = "starship.png";
            ctx.drawImage(enemyShip, this.x, this.y, scale, scale);
        }  
    }

    this.move = function(despx){
        this.x = this.x + despx;
        //drawShapes();    
    }
}

function gameOver(){
    var gOverImg = new Image(1200,400);
    gOverImg.src = "gameover.png"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(gOverImg, 0,0, canvas.width, canvas.height);
    alert("Pulsa para reiniciar.");
    document.location.reload();
}

function moveEnemies(){
    // mueve a todas las naves enemigas y comprueba si se salen del limite del canvas
    var i;
    
    for(i = 1; i < shapes.length; i++){
        if((shapes[i].x) >= 0 ){
            shapes[i].move(-(enemySpeed/ms2sec));
        }else{
            shapes.splice(i,1);
        }
    }
}

function checkCollides(){
    //Comprueba colisiones y cambia el valor de las vidas.
    var posBack;
    var posFront;
    var posLeft;
    var posRight;
    var i;
    
    posBack = shapes[0].x;
    posFront = shapes[0].x + scale;
    posLeft = shapes[0].y;
    posRight = shapes[0].y + scale;

    for(i = 1; i < shapes.length; i++){
        if(((shapes[i].x + scale) <= posFront)){
            if(((shapes[i].y) <= posRight) && ((shapes[i].y + shapes[i].sy) >= posLeft)){
                if(heal > 0){                
                    heal = heal - 1;
                    shapes.splice(i,1);
                    if(heal === 0){
                        gameOver();
                    }
                }
            }
        }
    }
}

function drawShapes(){
    var img = new Image();
    img.src = "fondo.jpg";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for(x in shapes){
        shapes[x].draw();
    }

    ctx.font = '10pt Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('LEVEL: '+ level , 1000, 20);
    ctx.fillText('LIVES: '+ heal , 1000, 40);
    ctx.fillText('POINTS: '+ count, 1000,60);
}

function getShape(id) {
    for(x in shapes) {
        if(shapes[x].id === id){
            return shapes[x];
        }
    }
}

function keyHandler(event) {
    var obj;
    obj = getShape("hero");
    if(obj === undefined)
        return;

    switch(event.key) {
        case "w":
        obj.move(-desp);
        break;
    case "s":
        obj.move(+desp);
        break;
    default:
        console.log("Key not handled");
  }
}

function render() {
    var obj = getShape("hero");
    if(((count % modulo) === 0 )){
        shapes.push(new Enemy("Enemy"+count , canvas.width, 400*(Math.random()), scale, scale, 'rgba(255, 0, 0, 0.5)'));
    }
    moveEnemies();
    checkCollides();
    drawShapes();
    if((count % 150) === 0){
        level = level + 1;
        enemySpeed = enemySpeed + 10000;
        leftLimit = leftLimit - 10;
        if((level % 2) === 0){
            if(modulo !== 0){
                modulo = modulo - 1;
            }
        }
    }
    count++;
}

function main(){
    var img = new Image(1200,400);
    canvas = document.getElementById('espacioexterior');
    img.src = "fondo.jpg";
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    ctx = canvas.getContext('2d');
    document.addEventListener('keydown', keyHandler, false);
    ctx.drawImage(img,0,0, canvas.width, canvas.height);
    shapes.push(new Hero("hero", posHeroY, 10, 'rgba(0, 0, 255, 1)'));

    setInterval(render, dt);
}




